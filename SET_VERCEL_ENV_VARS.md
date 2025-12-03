# Set Environment Variables in Vercel

The waitlist API is failing because the Supabase environment variables are not set in Vercel.

## Required Environment Variables

You need to set these two variables in Vercel:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: `https://wnbjdvjubqhzdujbayzt.supabase.co`

2. **SUPABASE_SERVICE_ROLE_KEY**
   - Value: `sb_secret_CehLi1Xl1Gbr0qe1eaF_Kw_JGiJ4G8o`

## Option 1: Set via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Navigate to: https://vercel.com/dashboard
   - Click on your **mindloom-landing-page** project

2. **Open Project Settings**
   - Click **Settings** tab
   - Click **Environment Variables** in the left sidebar

3. **Add First Variable**
   - Click **Add New**
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: `https://wnbjdvjubqhzdujbayzt.supabase.co`
   - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**

4. **Add Second Variable**
   - Click **Add New** again
   - **Key**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: `sb_secret_4SA9imqUeQJ1HNYKW4wy2A_CMEFaIXf`
   - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**

5. **Redeploy**
   - After adding variables, you MUST redeploy for them to take effect
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **Redeploy**
   - Or trigger a new deployment by pushing to GitHub

## Option 2: Set via Vercel CLI

```bash
# Set NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# When prompted, enter: https://wnbjdvjubqhzdujbayzt.supabase.co
# Select: Production, Preview, Development

# Set SUPABASE_SERVICE_ROLE_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY production
# When prompted, enter: sb_secret_CehLi1Xl1Gbr0qe1eaF_Kw_JGiJ4G8o
# Select: Production, Preview, Development

# Redeploy after adding variables
vercel --prod
```

## Verify Variables Are Set

After setting the variables and redeploying:

1. **Test the waitlist form** on your deployed site
2. **Check deployment logs** in Vercel Dashboard → Deployments → [Latest] → Logs
3. **Look for errors** related to missing environment variables

## Important Notes

- ⚠️ **Environment variables are NOT automatically synced** from your local `.env.local` file
- ⚠️ **You must manually add them** in Vercel Dashboard or via CLI
- ⚠️ **After adding variables, you MUST redeploy** for them to take effect
- ⚠️ **The service role key is secret** - never commit it to git or expose it publicly

## Troubleshooting

### Still Getting 500 Errors?

1. **Verify variables are set**:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Confirm both variables exist and have correct values

2. **Check environment scope**:
   - Make sure variables are set for **Production** environment
   - If using preview deployments, also set for **Preview**

3. **Redeploy after changes**:
   - Environment variables only apply to NEW deployments
   - You must redeploy after adding/changing variables

4. **Check deployment logs**:
   - Go to Deployments → [Latest Deployment] → Logs
   - Look for errors about missing environment variables

5. **Test locally first**:
   - Make sure your local `.env.local` has the correct values
   - Test the waitlist form locally to confirm it works

