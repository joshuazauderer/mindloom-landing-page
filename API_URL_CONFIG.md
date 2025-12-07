# API URL Configuration

## Current Setup

The landing page is configured to call the waitlist API at:
- **Production**: `https://app.mindloom.ink/api/waitlist`
- **Local**: `http://localhost:3001/api/waitlist`

## If Your Next.js App is on a Different Domain

If your Next.js app is deployed to a different URL (e.g., `mindloom.vercel.app`), update the API URL in `index.html`:

1. **Open `index.html`**
2. **Find this section** (around line 163):
   ```javascript
   } else if (window.location.hostname.includes('mindloom.ink')) {
       // Landing page is on mindloom.ink, API is on app subdomain
       apiUrl = 'https://app.mindloom.ink/api/waitlist';
   }
   ```
3. **Replace `app.mindloom.ink`** with your actual Next.js app domain

## Finding Your Next.js App URL

### Option 1: Check Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **mindloom-frontend** project
3. Check the **Domains** section
4. Your app URL will be listed there (e.g., `mindloom-frontend.vercel.app` or `app.mindloom.ink`)

### Option 2: Check Your Deployments
1. In Vercel Dashboard → Your Project → **Deployments**
2. Click on the latest deployment
3. The URL is shown at the top

### Option 3: Check Environment Variables
```bash
cd mindloom-frontend
cat .env.local | grep NEXT_PUBLIC_SITE_URL
```

## Common Configurations

### Scenario 1: Landing page on root, app on subdomain
- Landing page: `mindloom.ink` → API: `https://app.mindloom.ink/api/waitlist` ✅ (Current setup)

### Scenario 2: Both on same domain
- Landing page: `www.mindloom.ink` → API: `https://www.mindloom.ink/api/waitlist`
- Update code to:
  ```javascript
  apiUrl = 'https://www.mindloom.ink/api/waitlist';
  ```

### Scenario 3: App on Vercel default domain
- Landing page: `mindloom.ink` → API: `https://mindloom-frontend.vercel.app/api/waitlist`
- Update code to:
  ```javascript
  apiUrl = 'https://mindloom-frontend.vercel.app/api/waitlist';
  ```

## Testing

After updating the API URL:

1. **Commit and push** the changes
2. **Redeploy** the landing page on Vercel (or wait for auto-deploy)
3. **Test** the waitlist form on `mindloom.ink`
4. **Check browser console** for any errors
5. **Verify** emails are being saved in Supabase Dashboard

## Troubleshooting

### CORS Error Still Appears
- Verify the API route has CORS headers (already configured)
- Check that the API URL is correct
- Ensure Next.js app is deployed and accessible
- Test the API directly: `curl https://your-app-url/api/waitlist -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com"}'`

### 404 Error
- API endpoint doesn't exist
- Check that `/api/waitlist/route.ts` is deployed
- Verify Next.js app is running

### Network Error
- API URL is incorrect
- Next.js app is not deployed
- Check Vercel deployment status

























