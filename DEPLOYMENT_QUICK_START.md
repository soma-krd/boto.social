# Boto Deployment - Quick Start

This is a quick reference for deploying Boto. For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Quick Setup Checklist

### 1. Store Secrets in HashiCorp Vault

Store all environment variables from `env.production.example` in your Vault at path `boto/data/production`.

**Note:** This follows the format `app_name/data/environment` which is accessed via API as `/v1/boto/data/production`.

### 2. Configure GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

**Required:**
- `SERVER_HOST` - Your server IP or hostname
- `SERVER_USER` - SSH username (e.g., `ubuntu`)
- `SERVER_SSH_KEY` - Private SSH key for server access
- `SERVER_DEPLOY_PATH` - Deployment directory (e.g., `/opt/boto`)
- `VAULT_URL` - Vault server URL (e.g., `https://vault.example.com`)
- `VAULT_TOKEN` - Vault authentication token
- `VAULT_SECRET_PATH` - Vault secret path (e.g., `boto/data/production`)

### 3. Prepare Your Server

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose and jq
sudo apt install docker-compose-plugin jq -y

# Create deployment directory
sudo mkdir -p /opt/boto
sudo chown $USER:$USER /opt/boto

# Create subdirectories
cd /opt/boto
mkdir -p logs uploads scripts
```

### 4. Setup SSH Access

```bash
# On server: Generate deploy key
ssh-keygen -t ed25519 -C "github-deploy" -f ~/.ssh/github_deploy

# Add to authorized_keys
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Copy private key (add to GitHub Secrets as SERVER_SSH_KEY)
cat ~/.ssh/github_deploy
```

### 5. Deploy

**Automatic (Recommended):**
```bash
# Just push to main branch
git push origin main
```

**Manual:**
```bash
# SSH to server
ssh user@server
cd /opt/boto

# Copy deployment files
# - docker-compose.prod.yml
# - deploy.sh
# - scripts/fetch-vault-secrets.sh

# Set environment and deploy
export VAULT_URL="https://vault.example.com"
export VAULT_TOKEN="your-token"
export VAULT_SECRET_PATH="boto/data/production"
export IMAGE_TAG="latest"

./deploy.sh
```

## Common Commands

### View Logs
```bash
docker-compose -f /opt/boto/docker-compose.prod.yml logs -f
```

### Restart Services
```bash
cd /opt/boto
docker-compose -f docker-compose.prod.yml restart
```

### Check Status
```bash
cd /opt/boto
docker-compose -f docker-compose.prod.yml ps
```

### Manual Deployment
```bash
cd /opt/boto
export IMAGE_TAG="commit-sha-or-tag"
./deploy.sh
```

### Update Secrets
```bash
# Update in Vault first, then:
ssh user@server "cd /opt/boto && ./deploy.sh"
```

## Files Created

- `.github/workflows/build-containers.yml` - CI/CD pipeline
- `docker-compose.prod.yml` - Production Docker Compose configuration
- `deploy.sh` - Main deployment script
- `scripts/fetch-vault-secrets.sh` - Vault integration script
- `env.production.example` - Environment variables template
- `DEPLOYMENT.md` - Comprehensive deployment documentation
- `DEPLOYMENT_QUICK_START.md` - This file

## Workflow

```
Push to main → GitHub Actions → Build Docker Image → Push to GHCR 
→ SSH to Server → Fetch Vault Secrets → Deploy → Health Check ✓
```

## Prerequisites Checklist

- [ ] Server with Docker installed
- [ ] PostgreSQL database accessible
- [ ] Redis instance accessible
- [ ] Nginx configured
- [ ] HashiCorp Vault with secrets
- [ ] GitHub Secrets configured
- [ ] SSH access setup
- [ ] Domain with SSL configured

## Troubleshooting

**Deployment fails?**
- Check GitHub Actions logs
- Verify all GitHub Secrets are set correctly
- Test SSH connection: `ssh -i ~/.ssh/deploy_key user@server`
- Test Vault connection from server

**Container won't start?**
- Check logs: `docker-compose logs boto-app`
- Verify .env file exists: `cat /opt/boto/.env`
- Check database connection

**Health check fails?**
- Test endpoints: `curl http://localhost:3000` and `curl http://localhost:4200`
- Check if ports are open: `netstat -tulpn | grep -E '3000|4200'`

For detailed troubleshooting, see [DEPLOYMENT.md](./DEPLOYMENT.md#troubleshooting).

## Support

Need help? Check the comprehensive [DEPLOYMENT.md](./DEPLOYMENT.md) guide or open an issue on GitHub.

