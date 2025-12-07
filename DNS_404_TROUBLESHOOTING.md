# Troubleshooting 404 Error on www.mindloom.ink

## Current Status
- ✅ Vercel nameservers added to GoDaddy
- ❌ Domain showing 404 error
- ⏳ DNS propagation in progress

## Step-by-Step Troubleshooting

### Step 1: Verify Domain is Added in Vercel Dashboard

**Critical**: Even with Vercel nameservers, you MUST add the domain in Vercel Dashboard.

1. Go to https://vercel.com/dashboard
2. Click on your **mindloom-landing-page** project
3. Go to **Settings** → **Domains**
4. Check if `www.mindloom.ink` is listed
5. If not, click **Add** and enter `www.mindloom.ink`
6. Also add `mindloom.ink` (root domain) if you want both to work

**Expected Status**: Should show "Valid Configuration" or "Pending" (if DNS is still propagating)

### Step 2: Check DNS Propagation

DNS propagation can take 5 minutes to 48 hours (usually 5-30 minutes).

**Check DNS propagation:**
```bash
# Check what IPs the domain resolves to
dig +short www.mindloom.ink
dig +short mindloom.ink

# Check nameservers
dig NS mindloom.ink +short
```

**Expected Vercel Nameservers:**
- Should show nameservers like: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`, etc.

**Check online:**
- Visit: https://dnschecker.org/#A/www.mindloom.ink
- Should show Vercel IPs globally (may take time to propagate)

### Step 3: Verify Project is Deployed

1. Go to Vercel Dashboard → **Deployments**
2. Check if there's a recent successful deployment
3. If not, trigger a deployment:
   ```bash
   cd "/Users/joshuazauderer/My Drive/projects/mindloom-landing-page"
   vercel --prod
   ```

### Step 4: Check Vercel Domain Configuration

In Vercel Dashboard → Settings → Domains:

**For www.mindloom.ink:**
- Should show status: "Valid Configuration" or "Pending"
- If "Invalid Configuration", check DNS records

**Common Issues:**
- Domain not added in Vercel (most common!)
- DNS not propagated yet
- Wrong project connected to domain

### Step 5: Verify Nameserver Configuration in GoDaddy

1. Log into GoDaddy
2. Go to **My Products** → **Domains**
3. Click **DNS** next to `mindloom.ink`
4. Check **Nameservers** section
5. Should show Vercel nameservers (e.g., `ns1.vercel-dns.com`)

**If nameservers are wrong:**
- GoDaddy may have auto-filled default nameservers
- Manually set to Vercel nameservers shown in Vercel Dashboard

### Step 6: Wait for DNS Propagation

After changing nameservers:
- **Minimum wait**: 5-10 minutes
- **Typical wait**: 15-30 minutes
- **Maximum wait**: 48 hours

**While waiting:**
- Check DNS propagation: https://dnschecker.org
- Monitor Vercel Dashboard → Domains for status changes
- Try accessing the domain periodically

### Step 7: Test Domain Access

**Try these URLs:**
- `https://www.mindloom.ink`
- `https://mindloom.ink`
- `http://www.mindloom.ink` (should redirect to HTTPS)

**If still 404:**
- Clear browser cache
- Try incognito/private mode
- Try different browser
- Check Vercel deployment logs

## Common Issues and Solutions

### Issue: "Invalid Configuration" in Vercel

**Cause**: Domain not properly configured or DNS not propagated

**Solution**:
1. Verify domain is added in Vercel Dashboard
2. Check nameservers are correct in GoDaddy
3. Wait for DNS propagation
4. Check Vercel Dashboard for specific error messages

### Issue: DNS Resolves but Shows 404

**Cause**: Domain not connected to project or wrong project

**Solution**:
1. Verify domain is added to correct project in Vercel
2. Check if multiple projects use the same domain
3. Ensure latest deployment is successful
4. Check Vercel Dashboard → Domains → see which project is connected

### Issue: SSL Certificate Not Ready

**Cause**: Vercel needs time to provision SSL certificate

**Solution**:
- Wait 5-10 minutes after domain verification
- Vercel automatically provisions SSL certificates
- Check Vercel Dashboard → Domains for certificate status

### Issue: Nameservers Not Updating

**Cause**: GoDaddy may cache old nameservers

**Solution**:
1. Double-check nameservers are saved in GoDaddy
2. Clear GoDaddy DNS cache (if option available)
3. Wait longer for propagation
4. Contact GoDaddy support if nameservers won't update

## Quick Checklist

- [ ] Domain `www.mindloom.ink` added in Vercel Dashboard → Settings → Domains
- [ ] Domain `mindloom.ink` added in Vercel Dashboard (if needed)
- [ ] Nameservers correctly set in GoDaddy to Vercel nameservers
- [ ] Waited at least 5-10 minutes for DNS propagation
- [ ] Checked DNS propagation using dnschecker.org
- [ ] Verified project has successful deployment in Vercel
- [ ] Checked Vercel Dashboard → Domains shows "Valid Configuration"
- [ ] Tried accessing domain in incognito mode
- [ ] Cleared browser cache

## Verification Commands

```bash
# Check DNS resolution
dig +short www.mindloom.ink
dig +short mindloom.ink

# Check nameservers
dig NS mindloom.ink +short

# Check if domain resolves to Vercel
curl -I https://www.mindloom.ink

# Check Vercel deployment status (if Vercel CLI installed)
vercel ls
```

## Next Steps

1. **Immediate**: Add domain in Vercel Dashboard if not already added
2. **Wait**: Allow 15-30 minutes for DNS propagation
3. **Monitor**: Check Vercel Dashboard → Domains for status updates
4. **Test**: Try accessing domain periodically
5. **Verify**: Once working, test both HTTP and HTTPS

## Still Not Working?

If after 30 minutes the domain still shows 404:

1. **Check Vercel Dashboard**:
   - Go to Settings → Domains
   - Look for specific error messages
   - Check which project the domain is connected to

2. **Verify Nameservers**:
   - Confirm nameservers are exactly as shown in Vercel Dashboard
   - Some registrars require trailing dots, some don't

3. **Check Deployment**:
   - Ensure project has a successful deployment
   - Try redeploying: `vercel --prod`

4. **Contact Support**:
   - Vercel Support: https://vercel.com/support
   - Check Vercel Dashboard for domain-specific error messages

## Expected Timeline

- **0-5 minutes**: Nameservers updated in GoDaddy
- **5-15 minutes**: DNS starts propagating globally
- **15-30 minutes**: Domain should start working
- **30-60 minutes**: Full global propagation
- **Up to 48 hours**: Complete propagation (rare)

Most issues resolve within 30 minutes of setting nameservers correctly.

