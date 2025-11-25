# MindLoom Landing Page

A self-contained landing page for MindLoom, deployable to Vercel with built-in waitlist functionality.

## Features

- Clean, modern design
- Fully responsive
- Smooth scrolling navigation
- **Self-contained waitlist API** - no external dependencies!
- Serverless function for email collection

## Project Structure

```
mindloom-landing-page/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── vercel.json         # Vercel configuration
├── package.json        # Dependencies (Supabase)
├── api/
│   └── waitlist.js     # Serverless function for waitlist
└── README.md          # This file
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Add these to your Vercel project settings:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (starts with `sb_secret_...`)

### 3. Supabase Setup

Run the SQL script in `supabase-setup.sql` to create the `waitlist` table:

1. Go to Supabase Dashboard → SQL Editor
2. Run the contents of `supabase-setup.sql`

## Deployment to Vercel

### Option 1: Deploy from GitHub

1. Push to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your GitHub repository
5. Add environment variables (see above)
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
vercel --prod
```

## How It Works

- **Static HTML/CSS/JS** - Served directly by Vercel
- **Serverless Function** - `/api/waitlist.js` handles form submissions
- **Same Origin** - No CORS issues since API is on the same domain
- **Supabase Integration** - Stores emails in Supabase database

## Benefits

✅ **Self-contained** - No dependency on external APIs  
✅ **No CORS issues** - Same origin requests  
✅ **Simple deployment** - One repo, one project  
✅ **Fast** - No external API calls  
✅ **Easy maintenance** - Everything in one place  

## Testing Locally

```bash
# Install Vercel CLI if you haven't
npm install -g vercel

# Run local dev server
vercel dev
```

Then visit `http://localhost:3000` and test the waitlist form.

## View Waitlist Emails

Go to Supabase Dashboard → Table Editor → `waitlist` table to see all submitted emails.
