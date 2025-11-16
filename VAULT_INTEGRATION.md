# HashiCorp Vault Integration

This document explains how the Boto deployment integrates with HashiCorp Vault for secrets management.

## Overview

The deployment system fetches all environment variables from your self-hosted HashiCorp Vault instance during deployment, ensuring secrets are never stored in git or plain text files.

## Vault Path Format

The Vault integration uses the following path format:

```
app_name/data/environment
```

**For Boto:**
- Development: `boto/data/development`
- Staging: `boto/data/staging`
- Production: `boto/data/production`

**API Access:**
The secrets are accessed via the Vault HTTP API at:
```
https://your-vault-url/v1/boto/data/production
```

## How It Works

### 1. Store Secrets in Vault

Store all environment variables from `env.production.example` in your Vault:

```bash
# Using Vault CLI
vault kv put boto/data/production \
  NODE_ENV=production \
  DATABASE_URL="postgresql://user:pass@host:5432/db" \
  REDIS_URL="redis://host:6379" \
  JWT_SECRET="your-secret" \
  FRONTEND_URL="https://your-domain.com" \
  # ... all other variables
```

Or use the Vault UI at `https://your-vault-url/ui`

### 2. GitHub Actions Workflow

During deployment, the GitHub Actions workflow:
1. SSHs to your server
2. Copies deployment scripts including `scripts/fetch-vault-secrets.sh`
3. Passes Vault credentials as environment variables:
   - `VAULT_URL` - Your Vault server URL
   - `VAULT_TOKEN` - Authentication token
   - `VAULT_SECRET_PATH` - Path to secrets (e.g., `boto/data/production`)

### 3. Vault Secret Fetcher Script

The `scripts/fetch-vault-secrets.sh` script:

1. **Authenticates** with Vault using token or AppRole
2. **Fetches** secrets via API:
   ```bash
   curl -H "X-Vault-Token: $VAULT_TOKEN" \
     "$VAULT_URL/v1/boto/data/production"
   ```
3. **Parses** JSON response using `jq`:
   ```bash
   jq -r '.data.data | to_entries[] | .key + "=\"" + (.value | tostring) + "\""'
   ```
4. **Converts** to `.env` format:
   ```env
   # Generated from Vault secrets - DO NOT EDIT MANUALLY
   # This file was automatically generated during deployment
   
   NODE_ENV="production"
   DATABASE_URL="postgresql://user:pass@host:5432/db"
   REDIS_URL="redis://host:6379"
   # ... all other variables
   ```
5. **Writes** to `/opt/boto/.env` with proper permissions (600)

### 4. Docker Compose

The `docker-compose.prod.yml` loads the generated `.env` file:

```yaml
services:
  boto-app:
    image: ghcr.io/soma-krd/boto.social:${IMAGE_TAG:-latest}
    env_file:
      - .env  # Loaded from Vault
```

## JSON Parsing Methods

The script supports two parsing methods:

### Method 1: Using jq (Recommended)

When `jq` is installed (recommended), the script uses it for robust JSON parsing:

```bash
# Parses Vault KV v2 response format
echo "$response" | jq -r '.data.data | to_entries[] | .key + "=\"" + (.value | tostring) + "\""'
```

**Advantages:**
- Handles complex JSON structures
- Supports nested values
- Better error handling
- Properly escapes special characters
- Converts non-string values correctly

### Method 2: Fallback (grep/sed)

If `jq` is not available, falls back to basic parsing:

```bash
# Less robust but works without dependencies
secrets=$(echo "$response" | grep -o '"data":{[^}]*"data":{[^}]*}')
# Then parses with sed/cut
```

**Note:** Install `jq` on your server for best results:
```bash
sudo apt install jq -y
```

## Vault Response Format

The script expects Vault KV v2 response format:

```json
{
  "data": {
    "data": {
      "NODE_ENV": "production",
      "DATABASE_URL": "postgresql://...",
      "REDIS_URL": "redis://...",
      "JWT_SECRET": "secret123"
    },
    "metadata": {
      "created_time": "2024-01-01T00:00:00Z",
      "version": 1
    }
  }
}
```

The script extracts `.data.data` which contains your actual secrets.

## Authentication Methods

### Token-based (Simpler)

Set these GitHub Secrets:
- `VAULT_URL` - e.g., `https://vault.example.com`
- `VAULT_TOKEN` - e.g., `hvs.XXXXXXXXXXXX`
- `VAULT_SECRET_PATH` - e.g., `boto/data/production`

Create a token with read access:
```bash
# Create policy
vault policy write boto-read - <<EOF
path "boto/data/production" {
  capabilities = ["read"]
}
EOF

# Create token
vault token create -policy=boto-read -period=720h
```

### AppRole-based (More Secure)

Set these GitHub Secrets:
- `VAULT_URL`
- `VAULT_ROLE_ID`
- `VAULT_SECRET_ID`
- `VAULT_SECRET_PATH`

Setup AppRole:
```bash
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

## Security Features

1. **No Secrets in Git** - All secrets stored only in Vault
2. **Encrypted Transit** - HTTPS communication with Vault
3. **Token Expiry** - Tokens can expire automatically
4. **Audit Logs** - Vault logs all secret access
5. **File Permissions** - Generated `.env` file has 600 permissions
6. **Automatic Backup** - Old `.env` files backed up before overwrite

## Environment Variables Required

The `env.production.example` file lists all required variables. Key categories:

- **Application**: `NODE_ENV`, `FRONTEND_URL`, `BACKEND_URL`
- **Database**: `DATABASE_URL` (PostgreSQL)
- **Cache**: `REDIS_URL`, `REDIS_HOST`, `REDIS_PORT`
- **Security**: `JWT_SECRET`, `SESSION_SECRET`
- **Email**: `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`
- **Storage**: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- **OAuth**: `GITHUB_CLIENT_ID/SECRET`, `TWITTER_*`, etc.
- **Payments**: `STRIPE_*` keys
- **AI Services**: `OPENAI_API_KEY`, `ELEVENSLABS_API_KEY`
- **Monitoring**: `SENTRY_DSN`

See `env.production.example` for the complete list.

## Updating Secrets

### Update in Vault

```bash
# Update single secret
vault kv patch boto/data/production JWT_SECRET=new-secret

# Update multiple secrets
vault kv put boto/data/production \
  JWT_SECRET=new-secret \
  DATABASE_URL=new-connection-string
```

### Redeploy to Apply Changes

```bash
# Automatic: Push to main branch
git push origin main

# Or manual: SSH to server
ssh user@server "cd /opt/boto && ./deploy.sh"
```

The deployment script will:
1. Fetch updated secrets from Vault
2. Generate new `.env` file
3. Restart containers with new environment

## Testing Vault Connection

### From Your Machine

```bash
# Test connection
curl -H "X-Vault-Token: your-token" \
  https://vault.example.com/v1/boto/data/production

# Should return JSON with your secrets
```

### From Server

```bash
# SSH to server
ssh user@server

# Test fetch
export VAULT_URL="https://vault.example.com"
export VAULT_TOKEN="your-token"
export VAULT_SECRET_PATH="boto/data/production"

curl -s -H "X-Vault-Token: $VAULT_TOKEN" \
  "$VAULT_URL/v1/$VAULT_SECRET_PATH" | jq .
```

## Troubleshooting

### "Failed to fetch secrets from Vault"

1. Check Vault is accessible: `curl https://vault.example.com/v1/sys/health`
2. Verify token is valid: `vault token lookup`
3. Confirm path exists: `vault kv get boto/data/production`
4. Check token has read permissions

### "Failed to parse secrets"

1. Ensure `jq` is installed: `sudo apt install jq -y`
2. Verify Vault response format is correct
3. Check secrets are in correct path (not metadata path)

### "No data found at Vault path"

1. Confirm path format: `boto/data/production` (not `secret/data/boto/production`)
2. Check secrets are actually stored in Vault
3. Verify you're using correct environment (production vs staging)

### Empty .env file

1. Check script permissions: `chmod +x scripts/fetch-vault-secrets.sh`
2. Review script logs during deployment
3. Manually run script to see errors:
   ```bash
   cd /opt/boto
   export VAULT_URL="..."
   export VAULT_TOKEN="..."
   export VAULT_SECRET_PATH="boto/data/production"
   ./scripts/fetch-vault-secrets.sh
   ```

## Best Practices

1. **Use AppRole** for production (more secure than tokens)
2. **Rotate tokens** regularly
3. **Set token TTL** to limit exposure window
4. **Monitor Vault audit logs** for secret access
5. **Use different paths** for different environments
6. **Keep Vault updated** with security patches
7. **Backup Vault data** regularly
8. **Test secret rotation** process before production
9. **Document required secrets** (like `env.production.example`)
10. **Use Vault UI** for easier secret management

## Comparison with Other Methods

| Method | Security | Automation | Rotation | Audit |
|--------|----------|------------|----------|-------|
| **Vault** | ✅ Excellent | ✅ Full | ✅ Easy | ✅ Complete |
| .env file | ❌ Poor | ❌ Manual | ❌ Hard | ❌ None |
| GitHub Secrets | ⚠️ Good | ⚠️ Limited | ⚠️ Manual | ⚠️ Basic |
| AWS Secrets Manager | ✅ Good | ✅ Full | ✅ Easy | ✅ Good |

**Why Vault?**
- Self-hosted (full control)
- Free and open source
- Excellent audit logging
- Easy rotation
- Supports multiple auth methods
- Works with any infrastructure

## Additional Resources

- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [Vault KV Secrets Engine](https://www.vaultproject.io/docs/secrets/kv)
- [Vault AppRole Auth](https://www.vaultproject.io/docs/auth/approle)
- [Vault Security Model](https://www.vaultproject.io/docs/internals/security)

