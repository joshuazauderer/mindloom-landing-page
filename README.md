# MindLoom Landing Page

A beautiful, static landing page for MindLoom with waitlist functionality.

## Features

- 🎨 Clean, modern design
- 📱 Fully responsive
- ✨ Smooth scrolling navigation
- 📧 Waitlist signup with Supabase integration
- 🚀 Ready to deploy to Vercel
- ⚡ No build process - pure HTML, CSS, and JavaScript

## Project Structure

```
mindloom-landing-page/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── vercel.json         # Vercel configuration
├── supabase-setup.sql  # Database setup script
└── README.md          # This file
```

## Setup

### 1. Database Setup (Supabase)

Before the waitlist form will work, you need to set up the database:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor** → **New query**
4. Copy and paste the contents of `supabase-setup.sql`
5. Click **Run**

This creates the `waitlist` table to store email addresses.

### 2. Update API URL

If your landing page is deployed separately from your Next.js app, update the API URL in `index.html`:

```javascript
const apiUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api/waitlist'
    : 'https://your-nextjs-app.vercel.app/api/waitlist'; // Update this
```

Replace `https://your-nextjs-app.vercel.app` with your actual Next.js app URL.

## Local Development

### Option 1: Python HTTP Server

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080

### Option 2: Node.js HTTP Server

```bash
npx http-server -p 8080
```

### Option 3: Open Directly

```bash
open index.html
```

## Deployment to Vercel

### Option 1: Deploy via GitHub

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/mindloom-landing-page.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Click **"Deploy"** (no build settings needed)

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 3: Deploy via Vercel Dashboard

1. Drag and drop the `mindloom-landing-page` folder to [Vercel Dashboard](https://vercel.com/dashboard)
2. Vercel will automatically detect it as a static site
3. Click **"Deploy"**

## Waitlist API

The landing page connects to a Next.js API endpoint at `/api/waitlist`. Make sure:

1. Your Next.js app is deployed and accessible
2. The API route is available at `https://your-app.vercel.app/api/waitlist`
3. CORS is configured (already handled in the API route)
4. Supabase `waitlist` table exists (run `supabase-setup.sql`)

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    --highlight-color: #2563eb;
    /* ... */
}
```

### Content

Edit content directly in `index.html`.

### Form Submission

The form submits to `/api/waitlist` endpoint. To use a different service:

1. Update the `apiUrl` in `index.html`
2. Ensure the endpoint accepts POST requests with `{ email: "user@example.com" }`
3. Returns JSON: `{ success: true, message: "..." }`

## Environment Variables

No environment variables needed for the static landing page itself. The API endpoint (in your Next.js app) needs:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Testing

1. **Test locally**: Run a local server and test the form
2. **Test API**: Verify the API endpoint is accessible
3. **Test database**: Check Supabase Dashboard → Table Editor → waitlist
4. **Test deployment**: Deploy to Vercel and test live

## Troubleshooting

### Form not submitting
- Check browser console for errors
- Verify API URL is correct
- Ensure Next.js app is running/deployed
- Check CORS headers in API route

### Emails not saving
- Verify `waitlist` table exists in Supabase
- Check Supabase Dashboard → Logs for errors
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set in Next.js app

### CORS errors
- API route should include CORS headers (already configured)
- Check that API URL matches your Next.js deployment

## License

Copyright © 2024 MindLoom. All rights reserved.
