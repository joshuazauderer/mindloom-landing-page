# Vercel Domain Setup Guide for mindloom.ink

## Step-by-Step Instructions

### Step 1: Add Domain in Vercel

1. **Go to Vercel Dashboard**
   - Navigate to: https://vercel.com/dashboard
   - Click on your **mindloom-landing-page** project

2. **Open Project Settings**
   - Click **Settings** tab
   - Click **Domains** in the left sidebar

3. **Add Your Domain**
   - Enter: `mindloom.ink`
   - Click **Add**
   - Vercel will show you DNS configuration instructions

### Step 2: Configure DNS Records

Vercel will show you DNS records to add. You'll need to add these at your domain registrar (where you bought mindloom.ink).

#### Option A: Root Domain (mindloom.ink)

**If you want the landing page on the root domain:**

1. **Go to your domain registrar** (e.g., Namecheap, GoDaddy, Google Domains, etc.)
2. **Find DNS Management** (may be called "DNS Settings", "Name Servers", or "DNS Records")
3. **Add an A Record:**
   - **Type**: A
   - **Name/Host**: `@` or leave blank (for root domain)
   - **Value**: `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)
   - **TTL**: 3600 (or default)

4. **Add a CNAME Record (Alternative - Recommended):**
   - **Type**: CNAME
   - **Name/Host**: `@` or leave blank
   - **Value**: `cname.vercel-dns.com.` (note the trailing dot)
   - **TTL**: 3600

**Note**: Some registrars don't allow CNAME on root domain. If that's the case, use the A record method.

#### Option B: Subdomain (www.mindloom.ink)

**If you want the landing page on www subdomain:**

1. **Add CNAME Record:**
   - **Type**: CNAME
   - **Name/Host**: `www`
   - **Value**: `cname.vercel-dns.com.` (note the trailing dot)
   - **TTL**: 3600

2. **In Vercel**, also add `www.mindloom.ink` as a domain

### Step 3: Verify Domain in Vercel

1. **Wait for DNS Propagation** (can take 5 minutes to 48 hours, usually 5-30 minutes)
2. **Check Status in Vercel**
   - Go to Project Settings → Domains
   - You'll see status: "Valid Configuration" when DNS is correct
   - If it shows "Invalid Configuration", check your DNS records

3. **Test Your Domain**
   - Once verified, visit `https://mindloom.ink` in your browser
   - You should see your landing page

## Common Issues and Solutions

### Issue: "Invalid Configuration" in Vercel

**Possible causes:**
1. DNS records not propagated yet (wait 5-30 minutes)
2. Wrong DNS values
3. DNS records not saved at registrar

**Solutions:**
- Double-check DNS records match exactly what Vercel shows
- Use a DNS checker tool: https://dnschecker.org
- Verify records are saved at your registrar

### Issue: Domain Not Resolving

**Check DNS propagation:**
```bash
# In terminal, check if DNS is resolving
dig mindloom.ink
# or
nslookup mindloom.ink
```

**If not resolving:**
- Wait longer (up to 48 hours for full propagation)
- Check DNS records are correct
- Verify domain is not expired

### Issue: SSL Certificate Not Working

**Vercel automatically provisions SSL certificates**, but:
- Wait 5-10 minutes after domain verification
- Clear browser cache
- Try incognito mode
- Check Vercel Dashboard → Domains for certificate status

### Issue: Domain Points to Wrong Site

**If domain shows wrong content:**
- Check Vercel project settings → Domains
- Ensure correct project is connected
- Check if multiple projects use the same domain
- Verify DNS records point to Vercel

## DNS Record Reference

### For Root Domain (mindloom.ink)

**Option 1: A Record**
```
Type: A
Name: @ (or blank)
Value: 76.76.21.21
TTL: 3600
```

**Option 2: CNAME (if supported)**
```
Type: CNAME
Name: @ (or blank)
Value: cname.vercel-dns.com.
TTL: 3600
```

### For Subdomain (www.mindloom.ink)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com.
TTL: 3600
```

## Popular Domain Registrars - Where to Find DNS Settings

### Namecheap
1. Go to Domain List
2. Click "Manage" next to mindloom.ink
3. Go to "Advanced DNS" tab
4. Add records in "Host Records" section

### GoDaddy
1. Go to My Products
2. Click "DNS" next to mindloom.ink
3. Click "Add" to add new records

### Google Domains
1. Go to My Domains
2. Click mindloom.ink
3. Go to "DNS" tab
4. Scroll to "Custom resource records"

### Cloudflare
1. Select mindloom.ink domain
2. Go to "DNS" tab
3. Click "Add record"

## Quick Checklist

- [ ] Domain added in Vercel Dashboard → Project Settings → Domains
- [ ] DNS records added at domain registrar
- [ ] DNS records match Vercel's requirements exactly
- [ ] Waited 5-30 minutes for DNS propagation
- [ ] Verified DNS propagation using dnschecker.org
- [ ] Checked Vercel Dashboard shows "Valid Configuration"
- [ ] Tested domain in browser (try both http and https)
- [ ] SSL certificate provisioned (automatic, wait 5-10 min)

## Testing Your Setup

### Check DNS Propagation
Visit: https://dnschecker.org/#A/mindloom.ink

### Check SSL Certificate
Visit: https://www.ssllabs.com/ssltest/analyze.html?d=mindloom.ink

### Test Domain
```bash
# Check if domain resolves
curl -I https://mindloom.ink

# Should return 200 OK
```

## Need Help?

If you're still having issues:
1. Check Vercel Dashboard → Domains for specific error messages
2. Verify DNS records using dnschecker.org
3. Contact your domain registrar support
4. Check Vercel documentation: https://vercel.com/docs/concepts/projects/domains

