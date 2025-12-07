# URGENT: Fix DNS for mindloom.ink

## Current Problem
- Domain `mindloom.ink` is pointing to AWS IPs (15.197.225.128, 3.33.251.168) instead of Vercel
- DNS records appear to be missing or misconfigured
- Website is unreachable

## Quick Fix Steps

### Step 1: Go to Your Domain Registrar
Where did you buy `mindloom.ink`? (Namecheap, GoDaddy, Google Domains, Cloudflare, etc.)

### Step 2: Update DNS Records

**You have TWO options:**

#### Option A: Use CNAME (Recommended - Easier)
1. Go to DNS Management at your registrar
2. **Delete any existing A records** for `@` or root domain
3. **Add a CNAME record:**
   - **Type**: CNAME
   - **Name/Host**: `@` (or leave blank for root domain)
   - **Value**: `cname.vercel-dns.com.` (include the trailing dot!)
   - **TTL**: 3600 (or Auto)

**Note**: Some registrars don't allow CNAME on root domain. If yours doesn't, use Option B.

#### Option B: Use A Record
1. Go to DNS Management at your registrar
2. **Delete any existing A records** for `@` or root domain
3. **Add an A record:**
   - **Type**: A
   - **Name/Host**: `@` (or leave blank for root domain)
   - **Value**: `76.76.21.21` (Vercel's IP)
   - **TTL**: 3600 (or Auto)

### Step 3: Verify in Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select **mindloom-landing-page** project (NOT mindloom-frontend!)
3. Go to **Settings** → **Domains**
4. Make sure `mindloom.ink` is listed
5. If not listed, click **Add Domain** and enter `mindloom.ink`
6. Wait 5-30 minutes for DNS to propagate
7. Check that status shows "Valid Configuration"

### Step 4: Test
After 5-30 minutes:
```bash
# Check DNS resolution
dig mindloom.ink +short
# Should show Vercel IPs, not AWS IPs

# Test website
curl -I https://mindloom.ink
# Should return 200 OK, not 405 or 404
```

## Common Registrars - Where to Find DNS Settings

### Namecheap
1. Login → Domain List
2. Click **Manage** next to mindloom.ink
3. Go to **Advanced DNS** tab
4. Edit/Delete existing records
5. Add new CNAME or A record

### GoDaddy
1. My Products → Domains
2. Click **DNS** next to mindloom.ink
3. Delete old A records
4. Add new CNAME or A record

### Cloudflare
1. Select mindloom.ink domain
2. Go to **DNS** → **Records**
3. Delete old A records
4. Add new CNAME or A record

### Google Domains / Squarespace Domains
1. My Domains → mindloom.ink
2. Go to **DNS** tab
3. Delete old records
4. Add new CNAME or A record

## Important Notes

⚠️ **Make sure you're updating DNS for `mindloom-landing-page` project, NOT `mindloom-frontend`!**

⚠️ **DNS changes can take 5 minutes to 48 hours to propagate** (usually 5-30 minutes)

⚠️ **After updating DNS, wait 5-10 minutes, then check Vercel Dashboard** - it should show "Valid Configuration"

## Verify DNS Propagation
Visit: https://dnschecker.org/#A/mindloom.ink

After updating, you should see Vercel IPs, not AWS IPs.

## If Still Not Working After 30 Minutes

1. **Double-check DNS records** match exactly what's above
2. **Check Vercel Dashboard** → Domains → mindloom.ink → Should show "Valid Configuration"
3. **Clear browser cache** and try incognito mode
4. **Check Vercel project** - make sure domain is connected to `mindloom-landing-page`, not `mindloom-frontend`

## Current DNS Status (Before Fix)
```
mindloom.ink → 15.197.225.128 (AWS - WRONG!)
mindloom.ink → 3.33.251.168 (AWS - WRONG!)
```

## Expected DNS Status (After Fix)
```
mindloom.ink → cname.vercel-dns.com (CNAME method)
OR
mindloom.ink → 76.76.21.21 (A record method)
```
