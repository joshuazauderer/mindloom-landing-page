# MindLoom Landing Page

A self-contained landing page for MindLoom, deployable to Vercel with built-in waitlist functionality.

## Features

- ✅ Clean, modern design
- ✅ Fully responsive
- ✅ Smooth scrolling navigation
- ✅ **Self-contained waitlist API** - no external dependencies!
- ✅ Serverless function for email collection
- ✅ **No CORS issues** - same origin requests

## Project Structure

```
mindloom-landing-page/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── vercel.json         # Vercel configuration
├── package.json        # Dependencies (Supabase)
├── api/
│   └── waitlist.js     # Serverless function for waitlist
├── supabase-setup.sql  # SQL script to create waitlist table
└── README.md          # This file
```

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/joshuazauderer/mindloom-landing-page.git
cd mindloom-landing-page
npm install
```

### 2. Environment Variables

**Required for Vercel deployment:**

Add these to your Vercel project settings (Settings → Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
  - Example: `https://wnbjdvjubqhzdujbayzt.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
  - Format: Starts with `sb_secret_...`
  - Get it from: Supabase Dashboard → Settings → API → Secret keys

**Important:** After adding environment variables, you must **redeploy** for them to take effect.

### 3. Supabase Setup

Create the `waitlist` table in Supabase:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor**
4. Run the contents of `supabase-setup.sql`:

```sql
-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert/select
CREATE POLICY "Service role can manage waitlist"
  ON waitlist
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### 4. Deploy to Vercel

#### Option A: Deploy from GitHub

1. Push to GitHub (if not already done)
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **"Add New Project"**
4. Import your GitHub repository (`mindloom-landing-page`)
5. Add environment variables (see step 2 above)
6. Click **"Deploy"**

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

**Note:** Make sure to add environment variables in Vercel Dashboard before deploying!

## How It Works

### Architecture

- **Static HTML/CSS/JS** - Served directly by Vercel
- **Serverless Function** - `/api/waitlist.js` handles form submissions
- **Same Origin** - No CORS issues since API is on the same domain
- **Supabase Integration** - Stores emails in Supabase database

### Flow

1. User fills out waitlist form on `mindloom.ink`
2. Form submits to `/api/waitlist` (same origin)
3. Serverless function validates email and checks for duplicates
4. Email is stored in Supabase `waitlist` table
5. Success message displayed to user

## Benefits

✅ **Self-contained** - No dependency on external APIs  
✅ **No CORS issues** - Same origin requests  
✅ **Simple deployment** - One repo, one project  
✅ **Fast** - No external API calls  
✅ **Easy maintenance** - Everything in one place  
✅ **No build complexity** - Static files + simple serverless function  

## Testing Locally

```bash
# Install Vercel CLI if you haven't
npm install -g vercel

# Run local dev server
vercel dev
```

Then visit `http://localhost:3000` and test the waitlist form.

**Note:** For local testing, you'll need to set environment variables. Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://wnbjdvjubqhzdujbayzt.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## View Waitlist Emails

Go to Supabase Dashboard → Table Editor → `waitlist` table to see all submitted emails.

You can also export to CSV:
1. Supabase Dashboard → Table Editor → `waitlist`
2. Click **Export** → **CSV**

## Troubleshooting

### "Server configuration error" or "Missing Supabase environment variables"

**Cause:** Environment variables not set in Vercel

**Fix:**
1. Go to Vercel Dashboard → `mindloom-landing-page` → Settings → Environment Variables
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
3. Select **all environments** (Production, Preview, Development)
4. **Redeploy** the project (variables don't apply to existing deployments)

### "Failed to add email to waitlist"

**Cause:** Table doesn't exist or RLS policy issue

**Fix:**
1. Run `supabase-setup.sql` in Supabase SQL Editor
2. Verify `waitlist` table exists
3. Check RLS policies allow service role access

### Form submits but email doesn't appear in database

**Check:**
1. Vercel Dashboard → Logs (look for errors)
2. Supabase Dashboard → Logs (check for insert errors)
3. Verify environment variables are correct
4. Check Supabase service role key format (`sb_secret_...`)

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

Edit HTML content directly in `index.html`.

### Domain Setup

See `VERCEL_DOMAIN_SETUP.md` for instructions on connecting a custom domain.

## API Endpoint

### POST `/api/waitlist`

Submit an email to the waitlist.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "message": "Successfully added to waitlist!",
  "success": true
}
```

**Response (Already Exists):**
```json
{
  "message": "You're already on the waitlist!",
  "alreadyExists": true
}
```

**Response (Error):**
```json
{
  "error": "Valid email address is required"
}
```

## Security Notes

- The API uses Supabase service role key (server-side only)
- Row Level Security (RLS) is enabled but allows service role access
- Emails are normalized (lowercase, trimmed) before storage
- Duplicate emails are prevented (unique constraint)
- CORS headers allow all origins (acceptable for public waitlist)

## License

Private project - All rights reserved
