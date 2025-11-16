# Boto Production Deployment Guide

This guide explains how to deploy Boto to your production server with automated CI/CD using GitHub Actions, Docker, and HashiCorp Vault for secrets management.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
  - [1. HashiCorp Vault Setup](#1-hashicorp-vault-setup)
  - [2. Server Preparation](#2-server-preparation)
  - [3. GitHub Secrets Configuration](#3-github-secrets-configuration)
  - [4. Initial Deployment](#4-initial-deployment)
- [Deployment Process](#deployment-process)
- [Monitoring and Maintenance](#monitoring-and-maintenance)
- [Troubleshooting](#troubleshooting)
- [Rollback Procedure](#rollback-procedure)

## Overview

The deployment system automatically:
1. **Builds** multi-architecture Docker images (AMD64 + ARM64) on push to `main` branch
2. **Pushes** images to GitHub Container Registry (GHCR)
3. **Fetches** secrets from HashiCorp Vault
4. **Deploys** to your production server via SSH
5. **Runs** database migrations
6. **Performs** health checks

## Prerequisites

Before deploying, ensure you have:

- [ ] A Linux server (Ubuntu 20.04+ recommended) with Docker and Docker Compose installed
- [ ] PostgreSQL database (can be on same server or external)
- [ ] Redis instance (can be on same server or external)
- [ ] Nginx or other reverse proxy configured
- [ ] HashiCorp Vault instance (self-hosted or cloud)
- [ ] GitHub repository with appropriate permissions
- [ ] Domain name with SSL certificate configured

## Architecture

```
┌─────────────────┐
│   GitHub Repo   │
│   (Push to main)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │
│ (Build & Test)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│      GHCR       │
│ (Docker Images) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│  Your Server    │◄─────┤ HashiCorp Vault  │
│  (via SSH)      │      │  (Secrets)       │
└────────┬────────┘      └──────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Running Services:              │
│  • Backend (NestJS)             │
│  • Frontend (Next.js)           │
│  • Workers (BullMQ)             │
│  • Cron Jobs                    │
│                                 │
│  External Services:             │
│  • PostgreSQL                   │
│  • Redis                        │
│  • Nginx                        │
└─────────────────────────────────┘
```

## Setup Instructions

### 1. HashiCorp Vault Setup

#### a. Store Secrets in Vault

Create a secret path in Vault. The recommended format is `app_name/data/environment` (e.g., `boto/data/production`).

Add all environment variables from `env.production.example`:

```bash
# Example using Vault CLI (KV v2)
vault kv put boto/data/production \
  NODE_ENV=production \
  DATABASE_URL="postgresql://user:pass@host:5432/db" \
  REDIS_URL="redis://host:6379" \
  JWT_SECRET="your-jwt-secret" \
  FRONTEND_URL="https://your-domain.com" \
  NEXT_PUBLIC_BACKEND_URL="https://your-domain.com/api" \
  # ... add all other variables
```

**Note:** The actual Vault path will be accessed as `/v1/boto/data/production` via the API.

Or use the Vault UI to add secrets through the web interface.

#### b. Create Vault Token or AppRole

**Option 1: Using Token (Simpler)**
```bash
vault token create -policy=boto-read -period=720h
```

**Option 2: Using AppRole (More Secure)**
```bash
# Create policy
vault policy write boto-read - <<EOF
path "boto/data/production" {
  capabilities = ["read"]
}
EOF

# Enable AppRole
vault auth enable approle

# Create role
vault write auth/approle/role/boto \
  token_policies="boto-read" \
  token_ttl=1h \
  token_max_ttl=4h

# Get credentials
vault read auth/approle/role/boto/role-id
vault write -f auth/approle/role/boto/secret-id
```

### 2. Server Preparation

#### a. Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Install jq (required for Vault secrets parsing)
sudo apt install jq -y

# Verify installations
docker --version
docker compose version
jq --version
```

#### b. Create Deployment Directory

```bash
# Create deployment directory
sudo mkdir -p /opt/boto
sudo chown $USER:$USER /opt/boto
cd /opt/boto

# Create subdirectories
mkdir -p logs uploads
```

#### c. Setup SSH Access

On your server:
```bash
# Generate SSH key for GitHub Actions (if not exists)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy

# Add public key to authorized_keys
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Display private key (copy this for GitHub Secrets)
cat ~/.ssh/github_deploy
```

#### d. Configure Existing Services

Ensure PostgreSQL and Redis are accessible from the Docker network. If they're running on the same server, you may need to configure network access.

### 3. GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add the following secrets:

#### Required Secrets

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SERVER_HOST` | Server IP or hostname | `192.168.1.100` or `server.example.com` |
| `SERVER_USER` | SSH username | `ubuntu` or `deploy` |
| `SERVER_SSH_KEY` | Private SSH key for server access | Contents of `~/.ssh/github_deploy` |
| `SERVER_DEPLOY_PATH` | Deployment directory on server | `/opt/boto` |
| `VAULT_URL` | HashiCorp Vault server URL | `https://vault.example.com` |
| `VAULT_TOKEN` | Vault authentication token | `hvs.XXXXXXXXXXXX` |
| `VAULT_SECRET_PATH` | Path to secrets in Vault | `boto/data/production` |

#### Optional Secrets

| Secret Name | Description | Required When |
|------------|-------------|---------------|
| `VAULT_ROLE_ID` | Vault AppRole role ID | Using AppRole instead of token |
| `VAULT_SECRET_ID` | Vault AppRole secret ID | Using AppRole instead of token |
| `GHCR_TOKEN` | GitHub personal access token | Using private registry |
| `GHCR_USERNAME` | GitHub username | Using private registry |

### 4. Initial Deployment

#### a. Manual First Deployment (Recommended)

For the first deployment, manually run the setup on your server:

```bash
# SSH into your server
ssh user@your-server

# Navigate to deployment directory
cd /opt/boto

# Clone necessary files (or manually copy them)
# - docker-compose.prod.yml
# - deploy.sh
# - scripts/fetch-vault-secrets.sh

# Set execute permissions
chmod +x deploy.sh scripts/fetch-vault-secrets.sh

# Set Vault environment variables
export VAULT_URL="https://vault.example.com"
export VAULT_TOKEN="your-vault-token"
export VAULT_SECRET_PATH="boto/data/production"
export IMAGE_TAG="latest"

# Run deployment
./deploy.sh
```

#### b. Verify First Deployment

```bash
# Check running containers
docker ps

# Check container logs
docker-compose -f docker-compose.prod.yml logs -f boto-app

# Test frontend
curl http://localhost:4200

# Test backend
curl http://localhost:3000

# Check health
docker-compose -f docker-compose.prod.yml ps
```

## Deployment Process

### Automatic Deployment (Push to Main)

Once setup is complete, every push to the `main` branch will automatically:

1. **Trigger GitHub Actions workflow** (`.github/workflows/build-containers.yml`)
2. **Build Docker images** for both AMD64 and ARM64 architectures
3. **Push images to GHCR** with tags `:latest` and `:commit-sha`
4. **SSH to your server** with inline deployment script (blue-green deployment)
5. **Fetch secrets from Vault** via API and generate `.env` file
6. **Pull latest image** from GHCR
7. **Start new container** (`boto-app-new`) with updated image
8. **Wait for initialization** (15 seconds)
9. **Run database migrations** using Prisma
10. **Perform health checks** on both frontend (port 4200) and backend (port 3000)
    - 30 attempts with 2-second intervals
    - Checks if container is still running
    - Validates HTTP responses from both services
11. **Blue-green switch:**
    - If healthy: Stop old container → Rename new to production → Success! ✅
    - If unhealthy: Stop new container → Restore old .env → Rollback ❌
12. **Report deployment status** back to GitHub

**Deployment Strategy:** Blue-Green deployment with automatic rollback ensures zero-downtime deployments.

### Manual Deployment

**Option 1: Via GitHub Actions (Recommended)**

To manually trigger a deployment without pushing to main:

1. Go to GitHub repository → Actions
2. Select "Build Containers" workflow
3. Click "Run workflow" button
4. Select branch and run

**Option 2: Direct SSH Deployment**

For quick deployments or testing, you can use the standalone `deploy.sh` script:

```bash
# SSH to your server
ssh user@server
cd /opt/boto

# Set environment variables
export VAULT_URL="https://vault.example.com"
export VAULT_TOKEN="your-token"
export VAULT_SECRET_PATH="boto/data/production"
export IMAGE_TAG="latest"  # or specific commit SHA

# Run deployment
./deploy.sh
```

**Note:** The GitHub Actions workflow now includes all deployment logic inline for better reliability. The standalone `deploy.sh` and `scripts/fetch-vault-secrets.sh` are provided for manual deployments only.

### Deployment on Tags

The workflow also triggers on tags, useful for versioned releases:

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## Monitoring and Maintenance

### View Application Logs

```bash
# All services
docker-compose -f /opt/boto/docker-compose.prod.yml logs -f

# Specific service
docker-compose -f /opt/boto/docker-compose.prod.yml logs -f boto-app

# Last 100 lines
docker-compose -f /opt/boto/docker-compose.prod.yml logs --tail=100
```

### Check Container Status

```bash
cd /opt/boto
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml top
```

### Resource Usage

```bash
# Docker stats
docker stats

# System resources
htop  # or top
df -h  # disk usage
free -h  # memory usage
```

### Database Backup

```bash
# Backup PostgreSQL
docker exec postgres-container pg_dump -U username dbname > backup_$(date +%Y%m%d).sql

# Or if PostgreSQL is on the same server
pg_dump -U username dbname > backup_$(date +%Y%m%d).sql
```

### Update Secrets in Vault

```bash
# Update a specific secret
vault kv patch boto/data/production key=new_value

# Update multiple secrets
vault kv put boto/data/production \
  key1=value1 \
  key2=value2

# After updating, redeploy to apply changes
ssh user@server "cd /opt/boto && ./deploy.sh"
```

## Troubleshooting

### Deployment Fails

1. **Check GitHub Actions logs**
   - Go to repository → Actions → Select failed workflow
   - Review each step's output

2. **SSH connection issues**
   ```bash
   # Test SSH connection
   ssh -i ~/.ssh/deploy_key user@server
   
   # Check SSH key permissions (must be 600)
   chmod 600 ~/.ssh/deploy_key
   ```

3. **Vault connection issues**
   ```bash
    # Test Vault connection from server
    curl -H "X-Vault-Token: $VAULT_TOKEN" \
      $VAULT_URL/v1/boto/data/production
   
   # Check token validity
   vault token lookup
   ```

### Container Won't Start

```bash
# Check container logs
docker-compose -f docker-compose.prod.yml logs boto-app

# Inspect container
docker inspect boto-app

# Check environment variables
docker-compose -f docker-compose.prod.yml exec boto-app env

# Validate docker-compose file
docker-compose -f docker-compose.prod.yml config
```

### Health Check Failures

```bash
# Manual health check
curl -v http://localhost:4200  # Frontend
curl -v http://localhost:3000  # Backend

# Check if services are listening
netstat -tulpn | grep -E '3000|4200'

# Check container network
docker network ls
docker network inspect boto-network
```

### Database Connection Issues

```bash
# Test PostgreSQL connection
psql -h hostname -U username -d database

# From within container
docker-compose -f docker-compose.prod.yml exec boto-app sh
# Inside container:
nc -zv postgres-host 5432
```

### Redis Connection Issues

```bash
# Test Redis connection
redis-cli -h redis-host ping

# From within container
docker-compose -f docker-compose.prod.yml exec boto-app sh
# Inside container:
nc -zv redis-host 6379
```

## Rollback Procedure

### Automatic Rollback

The deployment script includes automatic rollback on failure. If any step fails, it will:
1. Restore the previous `.env` file
2. Restart containers with the previous image

### Manual Rollback

If you need to manually rollback to a previous version:

```bash
# SSH into server
ssh user@server
cd /opt/boto

# List available images
docker images ghcr.io/soma-krd/boto.social

# Stop current containers
docker-compose -f docker-compose.prod.yml down

# Update IMAGE_TAG to previous version
export IMAGE_TAG=previous-commit-sha

# Start with old version
docker-compose -f docker-compose.prod.yml up -d

# Or directly edit docker-compose.prod.yml to use specific tag
```

### Rollback from GitHub

1. Find the commit SHA you want to rollback to
2. Revert or create a new commit
3. Push to main branch to trigger automatic deployment

```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to specific commit (creates new history)
git revert commit-sha
git push origin main
```

## Security Best Practices

1. **Secrets Management**
   - Never commit `.env` files or secrets to git
   - Rotate Vault tokens regularly
   - Use AppRole for better security
   - Set appropriate Vault token TTL

2. **SSH Security**
   - Use SSH keys, not passwords
   - Restrict SSH key permissions (chmod 600)
   - Use dedicated deploy user with limited permissions
   - Consider IP whitelisting for SSH access

3. **Docker Security**
   - Keep Docker images updated
   - Use specific image tags, not always `latest`
   - Scan images for vulnerabilities
   - Run containers as non-root user

4. **Network Security**
   - Use HTTPS/TLS for all external connections
   - Restrict database/redis access to necessary IPs
   - Configure firewall (ufw, iptables)
   - Use VPN for sensitive connections

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)

## Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review application logs
3. Check GitHub Actions workflow logs
4. Verify all secrets are correctly configured
5. Ensure all prerequisites are met

For additional help, open an issue on the GitHub repository.

