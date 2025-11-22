#!/bin/bash

###############################################################################
# HashiCorp Vault Secret Fetcher
# 
# This script authenticates with HashiCorp Vault, fetches secrets from a 
# specified path, and converts them to a .env file format.
#
# Required Environment Variables:
#   VAULT_URL          - Vault server URL (e.g., https://vault.example.com)
#   VAULT_TOKEN         - Vault authentication token (or use VAULT_ROLE_ID/VAULT_SECRET_ID)
#   VAULT_SECRET_PATH   - Path to secrets in Vault (e.g., boto/data/production)
#
# Optional:
#   VAULT_ROLE_ID       - AppRole role ID (alternative to VAULT_TOKEN)
#   VAULT_SECRET_ID     - AppRole secret ID (alternative to VAULT_TOKEN)
#   ENV_FILE_PATH       - Output path for .env file (default: ./.env)
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
ENV_FILE_PATH="${ENV_FILE_PATH:-./.env}"

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

# Validate required environment variables
validate_env() {
    if [[ -z "$VAULT_URL" ]]; then
        log_error "VAULT_URL is not set"
        exit 1
    fi

    if [[ -z "$VAULT_SECRET_PATH" ]]; then
        log_error "VAULT_SECRET_PATH is not set"
        exit 1
    fi

    # Check if either token or AppRole credentials are provided
    if [[ -z "$VAULT_TOKEN" ]] && [[ -z "$VAULT_ROLE_ID" || -z "$VAULT_SECRET_ID" ]]; then
        log_error "Either VAULT_TOKEN or both VAULT_ROLE_ID and VAULT_SECRET_ID must be set"
        exit 1
    fi
}

# Authenticate with Vault using AppRole (if token not provided)
authenticate_approle() {
    log_info "Authenticating with Vault using AppRole..."
    
    local response
    response=$(curl -s --request POST \
        --data "{\"role_id\":\"${VAULT_ROLE_ID}\",\"secret_id\":\"${VAULT_SECRET_ID}\"}" \
        "${VAULT_URL}/v1/auth/approle/login")
    
    if [[ $? -ne 0 ]]; then
        log_error "Failed to authenticate with Vault AppRole"
        exit 1
    fi
    
    VAULT_TOKEN=$(echo "$response" | grep -o '"client_token":"[^"]*' | cut -d'"' -f4)
    
    if [[ -z "$VAULT_TOKEN" ]]; then
        log_error "Failed to extract token from AppRole authentication response"
        # Don't log the full response as it may contain sensitive data
        if echo "$response" | grep -q '"errors"'; then
            log_error "Vault returned errors (check AppRole credentials)"
        else
            log_error "Invalid response format from Vault"
        fi
        exit 1
    fi
    
    log_info "Successfully authenticated with AppRole"
}

# Fetch secrets from Vault
fetch_secrets() {
    log_info "Fetching secrets from Vault path: $VAULT_SECRET_PATH"
    
    local response
    response=$(curl -s -H "X-Vault-Token: ${VAULT_TOKEN}" \
        "${VAULT_URL}/v1/${VAULT_SECRET_PATH}")
    
    if [[ $? -ne 0 ]]; then
        log_error "Failed to fetch secrets from Vault"
        exit 1
    fi
    
    # Check if the fetch returned empty data or an error
    if [ -z "$response" ]; then
        log_error "Error: Empty response from Vault"
        exit 1
    fi
    
    # Check if response contains errors
    if echo "$response" | grep -q '"errors"'; then
        log_error "Vault returned errors:"
        echo "$response" | grep -o '"errors":\[[^]]*\]'
        exit 1
    fi
    
    # Check if data is null
    if command -v jq &> /dev/null; then
        if [ "$(echo "$response" | jq -r '.data.data')" == "null" ]; then
            log_error "Error: No data found at Vault path ${VAULT_SECRET_PATH}"
            # Check for errors without exposing full response
            if echo "$response" | jq -e '.errors' >/dev/null 2>&1; then
                log_error "Vault returned errors (check permissions and path)"
            fi
            exit 1
        fi
    fi
    
    echo "$response"
}

# Convert JSON secrets to .env format
convert_to_env() {
    local json_response="$1"
    local env_content=""
    
    log_info "Converting secrets to .env format..."
    
    # Check if jq is available for better JSON parsing
    if command -v jq &> /dev/null; then
        log_info "Using jq for JSON parsing"
        
        # Add header
        env_content="# Generated from Vault secrets - DO NOT EDIT MANUALLY\n"
        env_content="${env_content}# This file was automatically generated during deployment\n\n"
        
        # Parse using jq (handles nested values better)
        # Vault KV v2 format: .data.data | to_entries[]
        local parsed
        parsed=$(echo "$json_response" | jq -r '.data.data | to_entries[] | .key + "=\"" + (.value | tostring) + "\""' 2>/dev/null)
        
        if [[ -z "$parsed" ]]; then
            log_error "Failed to parse secrets with jq"
            # Don't log the full response as it contains sensitive data
            log_error "Invalid or empty response from Vault"
            exit 1
        fi
        
        env_content="${env_content}${parsed}"
    else
        log_warning "jq not found, using fallback parsing (install jq for better results)"
        
        # Fallback parsing without jq
        # Extract the data field from Vault KV v2 response
        # Vault KV v2 returns: {"data": {"data": {"KEY": "VALUE"}}}
        
        local secrets
        secrets=$(echo "$json_response" | grep -o '"data":{[^}]*"data":{[^}]*}' | sed 's/.*"data":{//' | sed 's/}$//')
        
        if [[ -z "$secrets" ]]; then
            log_error "Failed to extract secrets from Vault response"
            # Don't log the full response as it contains sensitive data
            log_error "Invalid response format from Vault"
            exit 1
        fi
        
        # Parse JSON and convert to KEY=VALUE format
        while IFS= read -r line; do
            if [[ -n "$line" ]]; then
                key=$(echo "$line" | sed 's/"//g' | cut -d':' -f1 | xargs)
                value=$(echo "$line" | sed 's/^[^:]*://' | sed 's/^"//' | sed 's/"$//' | sed 's/,$//')
                
                if [[ -n "$key" && "$key" != "data" ]]; then
                    env_content="${env_content}${key}=\"${value}\"\n"
                fi
            fi
        done < <(echo "$secrets" | tr ',' '\n')
    fi
    
    echo -e "$env_content"
}

# Write .env file
write_env_file() {
    local content="$1"
    
    log_info "Writing secrets to $ENV_FILE_PATH"
    
    # Backup existing .env file if it exists
    if [[ -f "$ENV_FILE_PATH" ]]; then
        local backup_path="${ENV_FILE_PATH}.backup.$(date +%Y%m%d_%H%M%S)"
        log_warning "Backing up existing .env file to $backup_path"
        cp "$ENV_FILE_PATH" "$backup_path"
    fi
    
    # Write new .env file
    echo -e "$content" > "$ENV_FILE_PATH"
    
    # Set appropriate permissions (readable only by owner)
    chmod 600 "$ENV_FILE_PATH"
    
    local line_count
    line_count=$(echo -e "$content" | grep -c '=')
    log_info "Successfully wrote $line_count environment variables to $ENV_FILE_PATH"
}

# Main execution
main() {
    log_info "Starting Vault secret fetch process..."
    
    # Validate environment variables
    validate_env
    
    # Authenticate with AppRole if using that method
    if [[ -n "$VAULT_ROLE_ID" && -n "$VAULT_SECRET_ID" ]]; then
        authenticate_approle
    fi
    
    # Fetch secrets from Vault
    vault_response=$(fetch_secrets)
    
    # Convert to .env format
    env_content=$(convert_to_env "$vault_response")
    
    # Write to file
    write_env_file "$env_content"
    
    log_info "✓ Vault secrets successfully fetched and written to $ENV_FILE_PATH"
}

# Run main function
main "$@"

