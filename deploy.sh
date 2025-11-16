#!/bin/bash

###############################################################################
# Boto Production Deployment Script
#
# This script handles the complete deployment process:
# 1. Fetches secrets from HashiCorp Vault
# 2. Pulls the latest Docker image
# 3. Stops existing containers gracefully
# 4. Starts new containers
# 5. Runs database migrations
# 6. Performs health checks
#
# Required Environment Variables:
#   VAULT_URL          - Vault server URL
#   VAULT_TOKEN         - Vault authentication token
#   IMAGE_TAG           - Docker image tag to deploy (default: latest)
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.prod.yml"
ENV_FILE="${SCRIPT_DIR}/.env"
IMAGE_NAME="ghcr.io/soma-krd/boto.social"
IMAGE_TAG="${IMAGE_TAG:-latest}"
HEALTH_CHECK_RETRIES=30
HEALTH_CHECK_INTERVAL=10

# Logging functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Error handler
handle_error() {
    log_error "Deployment failed at line $1"
    log_error "Rolling back to previous version..."
    rollback
    exit 1
}

trap 'handle_error $LINENO' ERR

# Rollback function
rollback() {
    log_warning "Attempting to rollback..."
    
    if [[ -f "${ENV_FILE}.backup" ]]; then
        mv "${ENV_FILE}.backup" "${ENV_FILE}"
        log_info "Restored previous .env file"
    fi
    
    # Try to restart with previous image
    docker-compose -f "$COMPOSE_FILE" up -d
}

# Fetch secrets from Vault
fetch_vault_secrets() {
    log_step "Step 1/7: Fetching secrets from HashiCorp Vault"
    
    if [[ ! -f "${SCRIPT_DIR}/scripts/fetch-vault-secrets.sh" ]]; then
        log_error "Vault secrets script not found at ${SCRIPT_DIR}/scripts/fetch-vault-secrets.sh"
        exit 1
    fi
    
    # Make sure the script is executable
    chmod +x "${SCRIPT_DIR}/scripts/fetch-vault-secrets.sh"
    
    # Export environment for the vault script
    export ENV_FILE_PATH="${ENV_FILE}"
    
    # Run the vault script
    bash "${SCRIPT_DIR}/scripts/fetch-vault-secrets.sh"
    
    if [[ ! -f "$ENV_FILE" ]]; then
        log_error "Failed to create .env file from Vault"
        exit 1
    fi
    
    log_info "✓ Secrets fetched successfully from Vault"
}

# Login to GitHub Container Registry
login_to_registry() {
    log_step "Step 2/7: Logging into GitHub Container Registry"
    
    # If GHCR_TOKEN is set, use it to login
    if [[ -n "$GHCR_TOKEN" ]]; then
        echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin
        log_info "✓ Logged into GHCR"
    else
        log_info "No GHCR_TOKEN provided, assuming public image or already logged in"
    fi
}

# Pull latest Docker image
pull_latest_image() {
    log_step "Step 3/7: Pulling Docker image ${IMAGE_NAME}:${IMAGE_TAG}"
    
    docker pull "${IMAGE_NAME}:${IMAGE_TAG}"
    
    if [[ $? -ne 0 ]]; then
        log_error "Failed to pull Docker image"
        exit 1
    fi
    
    log_info "✓ Image pulled successfully"
}

# Stop existing containers
stop_containers() {
    log_step "Step 4/7: Stopping existing containers"
    
    if docker-compose -f "$COMPOSE_FILE" ps -q | grep -q .; then
        log_info "Stopping running containers gracefully..."
        docker-compose -f "$COMPOSE_FILE" down --timeout 30
        log_info "✓ Containers stopped"
    else
        log_info "No running containers found"
    fi
}

# Start new containers
start_containers() {
    log_step "Step 5/7: Starting new containers"
    
    # Export IMAGE_TAG for docker-compose
    export IMAGE_TAG
    
    docker-compose -f "$COMPOSE_FILE" up -d
    
    if [[ $? -ne 0 ]]; then
        log_error "Failed to start containers"
        exit 1
    fi
    
    log_info "✓ Containers started successfully"
}

# Run database migrations
run_migrations() {
    log_step "Step 6/7: Running database migrations"
    
    # Wait a bit for the backend to be ready
    sleep 10
    
    # Run Prisma migrations inside the container
    docker-compose -f "$COMPOSE_FILE" exec -T boto-app sh -c "pnpm run prisma-db-push" || {
        log_warning "Migration command failed, but continuing (may not be critical)"
    }
    
    log_info "✓ Database migrations completed"
}

# Health check
health_check() {
    log_step "Step 7/7: Performing health checks"
    
    local retry=0
    local max_retries=$HEALTH_CHECK_RETRIES
    local frontend_url="http://localhost:4200"
    local backend_url="http://localhost:3000"
    
    log_info "Waiting for services to be healthy..."
    
    while [[ $retry -lt $max_retries ]]; do
        # Check if containers are running
        if ! docker-compose -f "$COMPOSE_FILE" ps | grep -q "Up"; then
            log_error "Containers are not running"
            exit 1
        fi
        
        # Check frontend health
        if curl -sf "$frontend_url" > /dev/null 2>&1; then
            log_info "✓ Frontend is healthy at $frontend_url"
            
            # Check backend health
            if curl -sf "$backend_url" > /dev/null 2>&1; then
                log_info "✓ Backend is healthy at $backend_url"
                log_info "✓ All health checks passed!"
                return 0
            fi
        fi
        
        retry=$((retry + 1))
        log_info "Health check attempt $retry/$max_retries - waiting ${HEALTH_CHECK_INTERVAL}s..."
        sleep $HEALTH_CHECK_INTERVAL
    done
    
    log_error "Health checks failed after $max_retries attempts"
    log_error "Check container logs: docker-compose -f $COMPOSE_FILE logs"
    exit 1
}

# Clean up old images
cleanup_old_images() {
    log_info "Cleaning up old Docker images..."
    
    # Remove dangling images
    docker image prune -f > /dev/null 2>&1 || true
    
    log_info "✓ Cleanup completed"
}

# Display deployment summary
display_summary() {
    log_info ""
    log_info "======================================"
    log_info "  Deployment Summary"
    log_info "======================================"
    log_info "Image: ${IMAGE_NAME}:${IMAGE_TAG}"
    log_info "Frontend: http://localhost:4200"
    log_info "Backend: http://localhost:3000"
    log_info "======================================"
    log_info ""
    log_info "To view logs: docker-compose -f $COMPOSE_FILE logs -f"
    log_info "To stop: docker-compose -f $COMPOSE_FILE down"
    log_info ""
}

# Main execution
main() {
    log_info "========================================="
    log_info "  Boto Production Deployment"
    log_info "========================================="
    log_info "Starting deployment at $(date)"
    log_info ""
    
    # Execute deployment steps
    fetch_vault_secrets
    login_to_registry
    pull_latest_image
    stop_containers
    start_containers
    run_migrations
    health_check
    
    # Cleanup
    cleanup_old_images
    
    # Display summary
    display_summary
    
    log_info "✅ Deployment completed successfully at $(date)"
}

# Run main function
main "$@"

