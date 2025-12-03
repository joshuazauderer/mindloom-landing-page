# Environment Variables Setup for Landing Page

## Error
```
Missing Supabase environment variables
```

This error occurs because the serverless function needs access to Supabase credentials.

## Solution: Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **`mindloom-landing-page`** project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in the left sidebar

### Step 2: Add Required Variables

#### Variable 1: `NEXT_PUBLIC_SUPABASE_URL`
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://wnbjdvjubqhzdujbayzt.supabase.co`
- **Environment**: Select **all** (Production, Preview, Development)
- Click **"Save"**

#### Variable 2: `SUPABASE_SERVICE_ROLE_KEY`
- **Key**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: `sb_secret_4SA9imqUeQJ1HNYKW4wy2A_CMEFaIXf` (or your actual key)
- **Environment**: Select **all** (Production, Preview, Development)
- **Important**: Check **"Encrypt"** checkbox for security
- Click **"Save"**

### Step 3: Redeploy
After adding the variables, you need to redeploy:

**Option A: Via Vercel Dashboard**
1. Go to **"Deployments"** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**

**Option B: Via Vercel CLI**
```bash
cd mindloom-landing-page
vercel --prod
```

**Option C: Push a new commit**
```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push origin main
```

## Verify It Works

After redeploying:
1. Test the waitlist form on `mindloom.ink`
2. Submit an email address
3. Should see success message (not "Server configuration error")
4. Check Supabase Dashboard → Table Editor → `waitlist` to see the email

## Troubleshooting

### Still Getting "Missing Supabase environment variables"
- ✅ Verify variables are added in Vercel Dashboard
- ✅ Make sure you selected **all environments** (Production, Preview, Development)
- ✅ Redeploy after adding variables (they don't apply to existing deployments)
- ✅ Check variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

### Getting Other Errors
- Check Vercel Dashboard → Logs for detailed error messages
- Verify Supabase service role key starts with `sb_secret_...`
- Make sure the `waitlist` table exists in Supabase (run `supabase-setup.sql`)



















