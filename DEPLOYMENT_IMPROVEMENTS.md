# Deployment Improvements Summary

This document summarizes the improvements made to match your existing infrastructure patterns.

## ✅ Changes Made

### 1. **Vault Environment Variable** (`VAULT_URL` vs `VAULT_ADDR`)

**Changed:** All references from `VAULT_ADDR` to `VAULT_URL`

**Files Updated:**
- `scripts/fetch-vault-secrets.sh`
- `DEPLOYMENT.md`
- `DEPLOYMENT_QUICK_START.md`
- `VAULT_INTEGRATION.md`
- `.github/workflows/build-containers.yml`

**Reason:** Matches your existing infrastructure naming convention

### 2. **Vault Path Format**

**Before:**
```
secret/data/boto/production
```

**After:**
```
boto/data/production
```

**API Path:** `/v1/boto/data/production`

**Reason:** Matches your existing Vault structure (`app_name/data/environment`)

### 3. **Improved GitHub Actions Deployment**

**Old Approach:**
- Copy scripts via SCP
- SSH and run external scripts
- Less control over execution

**New Approach (Matches Your Other Project):**
- All deployment logic inline in workflow
- Variables passed as arguments (not environment)
- Better error handling
- No file copying needed

**Key Features:**
```yaml
# Pass variables as arguments (prevents expansion issues)
bash -s -- \
  "$IMAGE_TAG" \
  "$DEPLOY_PATH" \
  "$VAULT_URL" \
  "$VAULT_TOKEN" \
  "$VAULT_SECRET_PATH" <<'DEPLOY_SCRIPT'

# Read arguments in script
IMAGE_TAG="$1"
DEPLOY_PATH="$2"
# ... etc
```

### 4. **Blue-Green Deployment Pattern**

**Old Approach:**
- Stop old container
- Start new container
- Limited rollback capability

**New Approach:**
- Start new container (`boto-app-new`)
- Run migrations
- Perform health checks
- If healthy: Rename new → production
- If unhealthy: Remove new, restore old .env
- Automatic rollback on failure

**Benefits:**
- ✅ Zero-downtime deployments
- ✅ Automatic rollback
- ✅ Better health checking
- ✅ Old container stays running until new one is verified

### 5. **Better Health Checks**

**New Features:**
- Checks if container is still running before health check
- Tests both frontend (4200) and backend (3000)
- 30 attempts with 2-second intervals
- Detailed logging
- Container log output on failure

```bash
for i in {1..30}; do
  if ! docker ps -q -f name="^${NEW_CONTAINER}$" | grep -q .; then
    echo "❌ Container stopped unexpectedly"
    docker logs --tail 50 "$NEW_CONTAINER"
    exit 1
  fi
  
  if curl -fs "$FRONTEND_URL" && curl -fs "$BACKEND_URL"; then
    echo "✅ Healthy!"
    # Swap containers
    exit 0
  fi
  
  sleep 2
done
```

### 6. **Improved Vault Integration**

**Enhancements:**
- Uses `jq` for robust JSON parsing (like your other app)
- Better error handling
- Validates null/empty responses
- Generates .env with header comments
- Backup of existing .env files
- Quotes values properly: `KEY="VALUE"`

```bash
# Validation
if [ "$(echo "$SECRETS_JSON" | jq -r '.data.data')" == "null" ]; then
  echo "❌ Error: No data found"
  exit 1
fi

# Parsing
jq -r '.data.data | to_entries[] | .key + "=\"" + (.value | tostring) + "\""'
```

### 7. **Better Error Handling**

**Improvements:**
- `set -euxo pipefail` for fail-fast behavior
- Detailed error messages
- Container logs on failure
- Automatic cleanup
- Rollback with .env restoration

### 8. **Simplified Deployment**

**Old:** Required multiple files on server
- `docker-compose.prod.yml`
- `deploy.sh`
- `scripts/fetch-vault-secrets.sh`

**New:** Inline deployment (no files needed)
- Everything in GitHub Actions workflow
- Standalone scripts optional (for manual deployment only)
- Simpler server setup

## 📋 GitHub Secrets Required

Update your GitHub repository secrets:

```
SERVER_HOST=your-server-ip
SERVER_USER=ubuntu
SERVER_SSH_KEY=<private-ssh-key>
SERVER_DEPLOY_PATH=/opt/boto
VAULT_URL=https://vault.example.com
VAULT_TOKEN=hvs.XXXXXXXXXXXX
VAULT_SECRET_PATH=boto/data/production
```

## 🔄 Migration from Old Setup

If you have an existing deployment:

1. **Update GitHub Secrets:**
   - Rename `VAULT_ADDR` → `VAULT_URL` (if exists)
   - Ensure `VAULT_SECRET_PATH` uses new format: `boto/data/production`

2. **On Server:**
   - Existing containers will be renamed during first deployment
   - Old `.env` files automatically backed up
   - No manual intervention needed

3. **First Deployment:**
   - Push to main branch
   - Workflow will create `boto-app-new` container
   - After health checks pass, old container removed
   - New container renamed to `boto-app`

## 📊 Deployment Flow Comparison

### Old Flow
```
1. Build image → Push to GHCR
2. SSH to server
3. Copy scripts
4. Run deploy.sh
5. Stop containers
6. Start containers
7. Done
```

### New Flow (Blue-Green)
```
1. Build image → Push to GHCR
2. SSH to server (inline script)
3. Fetch Vault secrets
4. Pull image
5. Start NEW container (boto-app-new)
6. Run migrations on NEW
7. Health check NEW (30 attempts)
8. ✅ If healthy:
   - Stop OLD container
   - Rename NEW → boto-app
   - Success!
9. ❌ If unhealthy:
   - Stop NEW container
   - Restore old .env
   - OLD container still running
   - Rollback complete
```

## 🎯 Key Benefits

1. **Reliability:** Blue-green deployment prevents downtime
2. **Security:** Variables passed as arguments, not exposed in logs
3. **Consistency:** Matches your existing infrastructure patterns
4. **Simplicity:** Less files to manage on server
5. **Observability:** Better logging and error messages
6. **Rollback:** Automatic rollback on any failure

## 🧪 Testing Recommendations

Before production use:

1. **Test Vault Connection:**
   ```bash
   curl -H "X-Vault-Token: $TOKEN" \
     "$VAULT_URL/v1/boto/data/production" | jq .
   ```

2. **Test SSH Connection:**
   ```bash
   ssh -i ~/.ssh/deploy_key user@server 'echo "SSH works!"'
   ```

3. **Test Health Endpoints:**
   ```bash
   curl http://localhost:4200  # Frontend
   curl http://localhost:3000  # Backend
   ```

4. **Run Test Deployment:**
   - Push to a test branch first
   - Manually trigger workflow
   - Verify logs in GitHub Actions

## 📚 Documentation Updates

All documentation updated to reflect new patterns:

- ✅ `DEPLOYMENT.md` - Complete guide
- ✅ `DEPLOYMENT_QUICK_START.md` - Quick reference  
- ✅ `VAULT_INTEGRATION.md` - Vault specifics
- ✅ `.github/workflows/build-containers.yml` - Workflow itself

## 🔧 Manual Deployment (Optional)

The standalone scripts (`deploy.sh`, `scripts/fetch-vault-secrets.sh`) are still available for manual deployments:

```bash
ssh user@server
cd /opt/boto
export VAULT_URL="https://vault.example.com"
export VAULT_TOKEN="your-token"
export VAULT_SECRET_PATH="boto/data/production"
export IMAGE_TAG="latest"
./deploy.sh
```

But for production, use GitHub Actions workflow (more reliable).

## 🚀 Next Steps

1. Update GitHub Secrets with new names
2. Update Vault path if needed (`boto/data/production`)
3. Install `jq` on server: `sudo apt install jq -y`
4. Test deployment workflow
5. Monitor first production deployment carefully
6. Celebrate zero-downtime deployments! 🎉

## 📞 Support

If issues arise:
1. Check GitHub Actions logs
2. SSH to server and check container logs: `docker logs boto-app`
3. Verify Vault connectivity
4. Check environment variables in container: `docker exec boto-app env`
5. Review `DEPLOYMENT.md` troubleshooting section

