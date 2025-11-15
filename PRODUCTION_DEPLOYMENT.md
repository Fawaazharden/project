# 🚀 Production Deployment Guide

## Overview

Your personalized landing pages work locally! Now let's deploy to production.

**Your Setup:**
- Project ID: `phcyc64u`
- Organization: `oXzT7Gzbp`
- Hosting: Likely Netlify (based on your project structure)

---

## ✅ Pre-Deployment Checklist

### 1. Add Production Domain to Sanity CORS

Go to: **https://www.sanity.io/manage**

1. Select project: **phcyc64u**
2. Go to: **Settings** → **API** → **CORS Origins**
3. Click: **"Add CORS Origin"** for each domain:

   **Main Domain:**
   - Origin: `https://vocalxlabs.com`
   - Check: ✅ **Allow credentials**
   - Click: **Save**

   **WWW Subdomain (if you use it):**
   - Origin: `https://www.vocalxlabs.com`
   - Check: ✅ **Allow credentials**
   - Click: **Save**

   **Preview/Staging (optional but recommended):**
   - Origin: `https://staging.vocalxlabs.com`
   - Check: ✅ **Allow credentials**
   - Click: **Save**

### 2. Keep Your Existing CORS Origins

✅ Keep `http://localhost:5173` for local development  
✅ Keep `http://localhost:3000` as backup

Your final CORS list should include:
- `http://localhost:5173`
- `http://localhost:3000`
- `https://vocalxlabs.com`
- `https://www.vocalxlabs.com`
- Any staging/preview domains

---

## 🌐 Deployment Instructions

### Option A: Netlify (Recommended)

#### Step 1: Add Environment Variable

1. Go to your Netlify dashboard
2. Select your site
3. Go to: **Site settings** → **Environment variables**
4. Click: **Add a variable**
5. Fill in:
   - **Key**: `VITE_SANITY_API_TOKEN`
   - **Value**: Your Sanity API token (same one from `.env`)
   - **Scopes**: Select all (Deploy, Functions, Post-processing)
6. Click: **Save**

#### Step 2: Trigger Redeploy

After adding the environment variable:

1. Go to: **Deploys** tab
2. Click: **Trigger deploy** → **Deploy site**
3. Wait for build to complete

Or push a new commit:

```bash
git add .
git commit -m "Add personalized landing pages"
git push
```

#### Step 3: Verify Deployment

1. Visit your admin page: `https://vocalxlabs.com/admin`
2. Login with: `admin123`
3. Create a test landing page
4. Visit the generated URL to verify

---

### Option B: Vercel

#### Step 1: Add Environment Variable

1. Go to your Vercel dashboard
2. Select your project
3. Go to: **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `VITE_SANITY_API_TOKEN`
   - **Value**: Your Sanity API token
   - **Environment**: Select all (Production, Preview, Development)
5. Click: **Save**

#### Step 2: Redeploy

Vercel will automatically redeploy. Or manually:

1. Go to **Deployments** tab
2. Click the **⋯** menu on latest deployment
3. Click: **Redeploy**

---

### Option C: Other Hosting Platforms

#### Cloudflare Pages

1. Dashboard → Your project → **Settings** → **Environment variables**
2. Add: `VITE_SANITY_API_TOKEN` = your token
3. Choose: **Production** environment
4. Save and redeploy

#### AWS Amplify

1. App settings → **Environment variables**
2. Add: `VITE_SANITY_API_TOKEN` = your token
3. Save and redeploy

#### GitHub Pages (with GitHub Actions)

Add to your repository secrets:
1. Repository → **Settings** → **Secrets and variables** → **Actions**
2. Click: **New repository secret**
3. Name: `VITE_SANITY_API_TOKEN`
4. Value: Your token
5. Update your GitHub Actions workflow to use it

---

## 🔒 Security Best Practices

### Environment Variables

✅ **DO:**
- Store API token in hosting platform's environment variables
- Use same token for all environments (dev, staging, production)
- Keep `.env` in `.gitignore` (already done ✅)

❌ **DON'T:**
- Commit `.env` to Git
- Hard-code token in source files
- Share token publicly or in screenshots

### Token Permissions

Your current token has **Editor** permissions, which is fine for:
- Creating personalized landing pages
- Reading existing pages
- Basic CMS operations

For enhanced security, you could create separate tokens:
- Development token (Editor)
- Production token (Editor with IP restrictions if needed)

### CORS Origins

✅ Only add domains you control  
✅ Always use HTTPS for production  
✅ Keep localhost for development

---

## 📊 Post-Deployment Checklist

### Verify Everything Works

- [ ] Admin page loads: `https://vocalxlabs.com/admin`
- [ ] Can login with password
- [ ] Can create a personalized landing page
- [ ] Generated URL works: `https://vocalxlabs.com/business-name`
- [ ] Video embeds display correctly
- [ ] Mobile responsive design works
- [ ] Navigation links work
- [ ] Footer displays correctly

### Test Edge Cases

- [ ] Non-existent business names redirect to home
- [ ] Special characters in business names convert correctly
- [ ] Different YouTube URL formats work
- [ ] Long business names create valid URLs

---

## 🐛 Troubleshooting Production Issues

### "CORS error in production"

**Check:**
- [ ] Production domain is added to Sanity CORS origins
- [ ] Domain matches exactly (https vs http, www vs non-www)
- [ ] "Allow credentials" is checked
- [ ] Try hard refresh (Ctrl+Shift+R)

**Solution:**
Go to Sanity management console and verify CORS settings.

### "401 Unauthorized in production"

**Check:**
- [ ] Environment variable is set in hosting platform
- [ ] Variable name is exactly: `VITE_SANITY_API_TOKEN`
- [ ] Token value is correct (no extra spaces)
- [ ] Site was redeployed after adding variable

**Solution:**
1. Re-add environment variable
2. Trigger manual redeploy
3. Check build logs for errors

### "Environment variable not found"

**Vite requires `VITE_` prefix:**
- ✅ Correct: `VITE_SANITY_API_TOKEN`
- ❌ Wrong: `SANITY_API_TOKEN`

**Check:**
- Variable name starts with `VITE_`
- Hosting platform supports Vite environment variables

### Pages load but can't create new ones

**Check:**
- [ ] API token has **Editor** (not Viewer) permissions
- [ ] Token hasn't expired
- [ ] Sanity dataset is `production`

---

## 🔄 Updating and Maintenance

### To Update Environment Variables

1. Update in hosting platform settings
2. Redeploy the site
3. No code changes needed

### To Rotate API Token (Security Best Practice)

1. Create new token in Sanity
2. Update hosting platform environment variable
3. Redeploy
4. Revoke old token in Sanity

### To Add More Domains

1. Add to Sanity CORS origins
2. No redeploy needed (just refresh browser)

---

## 📈 Scaling Considerations

### Performance

✅ **Already Optimized:**
- Sanity CDN for fast reads (`useCdn: true`)
- React lazy loading for components
- Optimized YouTube embeds
- Client-side routing

### Monitoring

Consider adding:
- Analytics on personalized pages
- Error tracking (Sentry, LogRocket)
- Performance monitoring (Web Vitals)

### Backup Strategy

Your data is safe in Sanity:
- Automatic backups by Sanity
- Version history available
- Can export data via Sanity CLI

---

## 🎯 Production URL Examples

After deployment, your personalized pages will be:

| Business Name | Production URL |
|--------------|----------------|
| Acme Corp | https://vocalxlabs.com/acme-corp |
| John's Real Estate | https://vocalxlabs.com/johns-real-estate |
| Tech Solutions | https://vocalxlabs.com/tech-solutions |

Share these URLs with your leads!

---

## 💡 Pro Tips

### 1. Test Before Sharing

Always test the personalized URL before sending to leads:
- Check video plays
- Verify business name displays
- Test on mobile
- Check all links work

### 2. URL Shortening

For cleaner links to share, consider:
- Bit.ly: `bit.ly/acme-demo`
- Your own short domain: `demo.vocalxlabs.com/acme`

### 3. QR Codes

Generate QR codes for physical marketing:
- Use the full URL: `https://vocalxlabs.com/business-name`
- Print on business cards, flyers, etc.

### 4. Email Templates

Pre-fill email templates with personalized URLs:

```
Hi {BusinessName},

I've created a custom demo for you:
https://vocalxlabs.com/{slug}

Watch the video to see how we can help!
```

### 5. Analytics Tracking

Add UTM parameters for tracking:
```
https://vocalxlabs.com/acme-corp?utm_source=email&utm_campaign=personalized
```

---

## 🆘 Need Help?

### Build Logs

If deployment fails:
1. Check build logs in your hosting platform
2. Look for environment variable errors
3. Verify Vite build completes successfully

### Browser Console

If pages don't work:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests

### Common Error Messages

**"Failed to fetch"**
- CORS origin not added
- Wrong domain in CORS settings

**"Network error"**
- API token not set
- Token invalid or expired

**"404 Not Found"**
- Business name slug doesn't exist in Sanity
- Check Sanity Studio for the document

---

## ✅ Production Ready Checklist

Before launching to clients:

- [ ] Environment variable added to hosting platform
- [ ] Production domain added to Sanity CORS
- [ ] Site successfully deployed
- [ ] Created test landing page in production
- [ ] Verified test page loads correctly
- [ ] Tested on desktop and mobile
- [ ] Video embeds work
- [ ] Admin password is secure (change if needed)
- [ ] Team members trained on creating pages
- [ ] Documentation shared with team

---

## 🎉 You're Live!

Once the checklist is complete, you're ready to:
1. Create personalized landing pages for your leads
2. Share unique URLs with each prospect
3. Track which leads engage with their custom page
4. Close more deals with personalized outreach!

**Your personalized landing page system is now live in production!** 🚀

---

## 📞 Support Resources

- **Sanity Docs**: https://www.sanity.io/docs
- **Vite Env Variables**: https://vitejs.dev/guide/env-and-mode.html
- **Netlify Env Vars**: https://docs.netlify.com/environment-variables/overview/
- **Vercel Env Vars**: https://vercel.com/docs/concepts/projects/environment-variables

Need custom modifications? Refer to the implementation files:
- `src/screens/PersonalizedLanding/PersonalizedLanding.tsx`
- `src/screens/Admin/AdminPage.tsx`
- `src/lib/sanity.ts`

