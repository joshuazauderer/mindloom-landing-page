# Deploy Landing Page to Vercel

This guide will help you deploy the MindLoom landing page with the video to Vercel so it's accessible at `mindloom.ink`.

## Prerequisites

- ✅ Video file (`videos/hero-video.mp4`) is ready (29MB)
- ✅ Code changes are committed to git
- ✅ Vercel account set up
- ✅ Domain `mindloom.ink` configured (see `VERCEL_DOMAIN_SETUP.md`)

## Step 1: Add Video to Git

The video file needs to be committed to git so it's included in the deployment:

```bash
cd "/Users/joshuazauderer/My Drive/projects/mindloom-landing-page"
git add videos/hero-video.mp4
git commit -m "Add hero video to landing page"
git push origin main
```

**Note:** The video is 29MB, which is within Vercel's 50MB limit. If you want to optimize it later, you can use tools like `ffmpeg` to compress it.

## Step 2: Set Environment Variables in Vercel

Before deploying, make sure your environment variables are set in Vercel:

1. **Go to Vercel Dashboard**
   - Navigate to: https://vercel.com/dashboard
   - Click on your **mindloom-landing-page** project

2. **Open Project Settings**
   - Click **Settings** tab
   - Click **Environment Variables** in the left sidebar

3. **Add Required Variables**
   Add these two environment variables:
   
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
     **Value**: `https://wnbjdvjubqhzdujbayzt.supabase.co`
   
   - **Name**: `SUPABASE_SERVICE_ROLE_KEY`
     **Value**: `sb_secret_4SA9imqUeQJ1HNYKW4wy2A_CMEFaIXf`
     (⚠️ Keep this secret! Never commit it to git)

4. **Set Environment Scope**
   - Make sure both variables are set for: **Production**, **Preview**, and **Development**
   - Click **Save** for each variable

## Step 3: Deploy to Vercel

You have two options:

### Option A: Deploy via GitHub (Recommended)

If your repository is connected to Vercel:

1. **Push changes to GitHub**
   ```bash
   git push origin main
   ```

2. **Vercel will automatically deploy**
   - Vercel watches your GitHub repository
   - Any push to `main` triggers a new deployment
   - Check the **Deployments** tab in Vercel dashboard

3. **Wait for deployment to complete**
   - Usually takes 1-2 minutes
   - You'll see a success message when done

### Option B: Deploy via Vercel CLI

If you prefer to deploy manually:

```bash
# Make sure you're in the project directory
cd "/Users/joshuazauderer/My Drive/projects/mindloom-landing-page"

# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel (if not already logged in)
vercel login

# Deploy to production
vercel --prod
```

## Step 4: Verify Deployment

After deployment completes:

1. **Check the deployment URL**
   - Go to Vercel Dashboard → Deployments
   - Click on the latest deployment
   - You'll see a URL like: `https://mindloom-landing-page-xyz.vercel.app`

2. **Test the landing page**
   - Visit the deployment URL
   - Verify the video loads and plays correctly
   - Test the "Join Waitlist" form

3. **Test your custom domain**
   - Visit `https://mindloom.ink`
   - Verify everything works correctly
   - Check that the video loads (may take a moment on first load)

## Step 5: Verify Video is Included

To confirm the video file was deployed:

1. **Check the deployment logs**
   - In Vercel Dashboard → Deployments → [Latest Deployment]
   - Look for the video file in the build logs

2. **Test video URL directly**
   - Try accessing: `https://mindloom.ink/videos/hero-video.mp4`
   - Should download or play the video

3. **Check browser DevTools**
   - Open DevTools → Network tab
   - Reload the page
   - Look for `hero-video.mp4` in the network requests
   - Should show a 200 status and ~29MB size

## Troubleshooting

### Video Not Loading

**Issue**: Video doesn't appear on the page

**Solutions**:
1. Check browser console for errors
2. Verify video file path in `index.html` matches `/videos/hero-video.mp4`
3. Check Vercel deployment logs for file upload errors
4. Verify video file is committed to git (check `git ls-files videos/`)

### Video Too Large

**Issue**: Deployment fails or video is slow to load

**Solutions**:
1. Optimize the video using `ffmpeg`:
   ```bash
   ffmpeg -i videos/hero-video.mp4 -vcodec libx264 -crf 28 -preset slow videos/hero-video-optimized.mp4
   ```
2. Consider using a CDN or video hosting service (YouTube, Vimeo, Cloudflare Stream)
3. Compress the video further if needed

### Environment Variables Not Working

**Issue**: Waitlist form shows errors

**Solutions**:
1. Verify environment variables are set in Vercel Dashboard
2. Make sure variables are set for **Production** environment
3. **Redeploy** after adding/changing environment variables
4. Check Vercel deployment logs for environment variable errors

### Domain Not Working

**Issue**: `mindloom.ink` doesn't show the landing page

**Solutions**:
1. Check DNS configuration (see `VERCEL_DOMAIN_SETUP.md`)
2. Verify domain is added in Vercel Dashboard → Settings → Domains
3. Wait for DNS propagation (can take up to 48 hours, usually 5-30 minutes)
4. Check domain status in Vercel Dashboard

## File Size Considerations

- **Current video size**: 29MB
- **Vercel limit**: 50MB per file
- **Recommendation**: Consider optimizing the video for web:
  - Target: 5-10MB for faster loading
  - Use H.264 codec
  - Reduce resolution if needed (1080p is usually sufficient)
  - Lower bitrate for web playback

## Quick Checklist

- [ ] Video file added to git (`git add videos/hero-video.mp4`)
- [ ] Changes committed and pushed to GitHub
- [ ] Environment variables set in Vercel Dashboard
- [ ] Deployment triggered (automatic or manual)
- [ ] Deployment completed successfully
- [ ] Video loads correctly on deployment URL
- [ ] Video loads correctly on `mindloom.ink`
- [ ] Waitlist form works correctly
- [ ] Tested in multiple browsers

## Next Steps

After successful deployment:

1. **Monitor performance**
   - Check Vercel Analytics for page load times
   - Monitor video loading performance

2. **Optimize if needed**
   - Compress video if loading is slow
   - Consider lazy loading the video
   - Add loading states for better UX

3. **Set up monitoring**
   - Enable Vercel Analytics
   - Set up error tracking (if needed)

## Need Help?

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Check deployment logs**: Vercel Dashboard → Deployments → [Your Deployment] → Logs

