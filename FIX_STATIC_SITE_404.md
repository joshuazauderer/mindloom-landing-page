# Fix 404 Error - Static Site Configuration

## Problem
Both `www.mindloom.ink` and `mindloom-landing-page.vercel.app` are returning 404, even though:
- ✅ Domain is configured in Vercel
- ✅ DNS is working
- ✅ Deployment shows "Static Assets: 16"

This means Vercel isn't recognizing how to serve the static files.

## Solution Applied

I've updated two files to fix the static site configuration:

### 1. `vercel.json` - Added explicit output directory
```json
{
  "buildCommand": null,
  "outputDirectory": ".",
  ...
}
```

This tells Vercel:
- No build step needed (`buildCommand: null`)
- Serve files from root directory (`outputDirectory: "."`)

### 2. `package.json` - Added build script
```json
{
  "scripts": {
    "build": "echo 'No build step needed for static site'",
    ...
  }
}
```

This ensures Vercel knows there's a build script (even if it does nothing).

## Next Steps

### Step 1: Commit and Push Changes

```bash
cd "/Users/joshuazauderer/My Drive/projects/mindloom-landing-page"
git add vercel.json package.json
git commit -m "Fix Vercel static site configuration"
git push origin main
```

### Step 2: Wait for Auto-Deployment

Vercel will automatically detect the push and redeploy (usually takes 1-2 minutes).

### Step 3: Verify Deployment

1. Go to Vercel Dashboard → Deployments
2. Wait for new deployment to complete
3. Check deployment logs for any errors

### Step 4: Test Domain

After deployment completes (2-3 minutes):

```bash
curl -I https://www.mindloom.ink
```

Should return `HTTP/2 200` instead of `404`.

## Alternative: Manual Redeploy

If auto-deployment doesn't work, manually trigger:

```bash
cd "/Users/joshuazauderer/My Drive/projects/mindloom-landing-page"
vercel --prod
```

## Why This Happens

Vercel automatically detects frameworks (Next.js, React, etc.), but for pure static sites with no framework, it sometimes needs explicit configuration to:
1. Know there's no build step
2. Know where to serve files from
3. Understand it's a static site, not a serverless function

## Verification Checklist

After redeploying:
- [ ] New deployment shows in Vercel Dashboard
- [ ] Deployment completes successfully
- [ ] `curl -I https://www.mindloom.ink` returns 200
- [ ] `curl -I https://mindloom-landing-page.vercel.app` returns 200
- [ ] Browser shows the landing page (not 404)

## If Still Not Working

If after redeploying you still get 404:

1. **Check Vercel Project Settings**:
   - Go to Settings → General
   - Check "Framework Preset" - should be "Other" or blank
   - Check "Root Directory" - should be blank or "/"
   - Check "Build Command" - should be blank or match package.json
   - Check "Output Directory" - should be blank or "."

2. **Check Deployment Logs**:
   - Go to Deployments → Latest → View Logs
   - Look for errors about missing files
   - Check if index.html is being detected

3. **Verify Files Are Deployed**:
   - Check Vercel Dashboard → Deployments → [Latest] → View Files
   - Should see: index.html, styles.css, logo.png, etc.

4. **Try Different Configuration**:
   If the above doesn't work, we might need to:
   - Move files to a `public` directory
   - Add a build script that copies files
   - Configure as a different project type

## Expected Result

After these changes and redeployment:
- ✅ Root domain (`mindloom.ink`) works
- ✅ WWW domain (`www.mindloom.ink`) works  
- ✅ Default Vercel domain works
- ✅ All static assets (CSS, images, videos) load correctly
- ✅ API routes (`/api/waitlist`) work correctly

