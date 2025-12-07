# Vercel CLI Guide

This guide covers how to manage environment variables and deploy to Vercel using the command line interface (CLI).

## Prerequisites

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```
   This will open your browser to authenticate.

3. **Link your project** (if not already linked):
   ```bash
   cd /path/to/mindloom-landing-page
   vercel link
   ```
   Follow the prompts to select your project.

## Managing Environment Variables via CLI

### List All Environment Variables

View all environment variables currently set for your project:

```bash
vercel env ls
```

This shows:
- Variable names
- Whether values are encrypted (values are hidden for security)
- Which environments they're set for (Production, Preview, Development)
- When they were created

### Add Environment Variables

Add a new environment variable to a specific environment:

```bash
echo "your-value-here" | vercel env add VARIABLE_NAME production
echo "your-value-here" | vercel env add VARIABLE_NAME preview
echo "your-value-here" | vercel env add VARIABLE_NAME development
```

**Example - Adding Supabase URL:**
```bash
echo "https://wnbjdvjubqhzdujbayzt.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo "https://wnbjdvjubqhzdujbayzt.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL preview
echo "https://wnbjdvjubqhzdujbayzt.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL development
```

**Example - Adding Service Role Key:**
```bash
echo "sb_secret_CehLi1Xl1Gbr0qe1eaF_Kw_JGiJ4G8o" | vercel env add SUPABASE_SERVICE_ROLE_KEY production
echo "sb_secret_CehLi1Xl1Gbr0qe1eaF_Kw_JGiJ4G8o" | vercel env add SUPABASE_SERVICE_ROLE_KEY preview
echo "sb_secret_CehLi1Xl1Gbr0qe1eaF_Kw_JGiJ4G8o" | vercel env add SUPABASE_SERVICE_ROLE_KEY development
```

**Note:** You need to add the variable separately for each environment (production, preview, development) if you want it available in all environments.

### Update Environment Variables

To update an existing environment variable, you must first remove it, then add it again with the new value:

```bash
# Remove from production
vercel env rm VARIABLE_NAME production --yes

# Add new value to production
echo "new-value-here" | vercel env add VARIABLE_NAME production

# Repeat for preview and development if needed
vercel env rm VARIABLE_NAME preview --yes
echo "new-value-here" | vercel env add VARIABLE_NAME preview

vercel env rm VARIABLE_NAME development --yes
echo "new-value-here" | vercel env add VARIABLE_NAME development
```

**Example - Updating Service Role Key:**
```bash
# Remove old key from production
vercel env rm SUPABASE_SERVICE_ROLE_KEY production --yes

# Add new key to production
echo "sb_secret_CehLi1Xl1Gbr0qe1eaF_Kw_JGiJ4G8o" | vercel env add SUPABASE_SERVICE_ROLE_KEY production

# Update preview
vercel env rm SUPABASE_SERVICE_ROLE_KEY preview --yes
echo "sb_secret_CehLi1Xl1Gbr0qe1eaF_Kw_JGiJ4G8o" | vercel env add SUPABASE_SERVICE_ROLE_KEY preview

# Update development
vercel env rm SUPABASE_SERVICE_ROLE_KEY development --yes
echo "sb_secret_CehLi1Xl1Gbr0qe1eaF_Kw_JGiJ4G8o" | vercel env add SUPABASE_SERVICE_ROLE_KEY development
```

### Remove Environment Variables

Remove an environment variable from a specific environment:

```bash
vercel env rm VARIABLE_NAME production --yes
vercel env rm VARIABLE_NAME preview --yes
vercel env rm VARIABLE_NAME development --yes
```

**Note:** The `--yes` flag skips the confirmation prompt. Remove it if you want to be prompted.

### Pull Environment Variables Locally

Download environment variables from Vercel to a local file (useful for verification):

```bash
vercel env pull .env.vercel
```

This creates a `.env.vercel` file with the current environment variables. **Important:** Don't commit this file to git if it contains secrets!

## Deploying to Vercel via CLI

### Deploy to Production

Deploy your latest code to production:

```bash
vercel --prod
```

This will:
1. Upload your project files
2. Build your project
3. Deploy to production
4. Return a production URL

### Deploy to Preview

Deploy to a preview environment (for testing before production):

```bash
vercel
```

This creates a preview deployment with a unique URL that you can share for testing.

### Deploy Specific Branch/Commit

Deploy a specific git branch or commit:

```bash
vercel --prod --force
```

The `--force` flag forces a new deployment even if nothing has changed.

### View Deployment Status

After deploying, you'll see:
- A preview URL (for `vercel` command)
- A production URL (for `vercel --prod` command)
- An inspect URL to view deployment details

### Common Deployment Commands

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Deploy and force rebuild
vercel --prod --force

# Deploy with specific environment
vercel --prod --env production
```

## Complete Workflow Example

Here's a complete workflow for updating environment variables and deploying:

```bash
# 1. Navigate to project directory
cd /path/to/mindloom-landing-page

# 2. Check current environment variables
vercel env ls

# 3. Update an environment variable (if needed)
vercel env rm SUPABASE_SERVICE_ROLE_KEY production --yes
echo "sb_secret_CehLi1Xl1Gbr0qe1eaF_Kw_JGiJ4G8o" | vercel env add SUPABASE_SERVICE_ROLE_KEY production

# 4. Deploy to production
vercel --prod

# 5. Verify deployment
# Visit the production URL returned by the deploy command
```

## Important Notes

### Environment Variables

- ⚠️ **Environment variables are NOT automatically synced** from your local `.env.local` file
- ⚠️ **You must manually add/update them** in Vercel via CLI or Dashboard
- ⚠️ **After adding/changing variables, you MUST redeploy** for them to take effect
- ⚠️ **Values are encrypted** - you can't view them via `vercel env ls`, only verify they exist
- ⚠️ **Use `vercel env pull`** to download and verify values locally (don't commit the file!)

### Deployments

- ⚠️ **New deployments are required** after changing environment variables
- ⚠️ **Production deployments** use the `--prod` flag
- ⚠️ **Preview deployments** are created automatically for pull requests (if GitHub is connected)
- ⚠️ **Build cache** may be used - use `--force` to force a fresh build

### Security

- ⚠️ **Never commit `.env.vercel`** or any file containing secrets to git
- ⚠️ **Service role keys are sensitive** - keep them secure
- ⚠️ **Use different keys** for different environments if needed

## Troubleshooting

### Environment Variables Not Working

1. **Verify variables are set**:
   ```bash
   vercel env ls
   ```

2. **Check environment scope**:
   - Make sure variables are set for the correct environment (production/preview/development)
   - Production deployments only use production environment variables

3. **Redeploy after changes**:
   ```bash
   vercel --prod
   ```

4. **Verify values locally** (if needed):
   ```bash
   vercel env pull .env.vercel
   cat .env.vercel
   rm .env.vercel  # Clean up after checking
   ```

### Deployment Issues

1. **Check deployment logs**:
   - Visit the inspect URL provided after deployment
   - Or go to Vercel Dashboard → Deployments → [Your Deployment] → Logs

2. **Force rebuild**:
   ```bash
   vercel --prod --force
   ```

3. **Verify project is linked**:
   ```bash
   vercel link
   ```

## Quick Reference

### Environment Variable Commands

```bash
# List all variables
vercel env ls

# Add variable
echo "value" | vercel env add VAR_NAME production

# Remove variable
vercel env rm VAR_NAME production --yes

# Pull variables locally
vercel env pull .env.vercel
```

### Deployment Commands

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Force rebuild
vercel --prod --force
```

## Additional Resources

- **Vercel CLI Documentation**: https://vercel.com/docs/cli
- **Environment Variables Guide**: https://vercel.com/docs/concepts/projects/environment-variables
- **Deployment Guide**: https://vercel.com/docs/concepts/deployments







