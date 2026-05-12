# 🚀 Deployment Guide

Hướng dẫn deploy Bái Chọi Game lên các nền tảng khác nhau.

## 📋 Pre-Deployment Checklist

- ✅ Build project thành công: `npm run build`
- ✅ Test production build: `npm run preview`
- ✅ Kiểm tra tất cả animations
- ✅ Test sound effects trên browsers khác nhau
- ✅ Mobile responsive test
- ✅ Git commits sạch

## 🌐 Deployment Options

### 1. Vercel (Recommended) ⭐

**Easiest solution - Auto-deploy on git push**

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to https://vercel.com
# Click "New Project"
# Select your GitHub repo
# Deploy (auto-detected as Vite React)

# Your site: https://baichoigame.vercel.app
```

**Configuration:**
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment: Auto-detected

### 2. Netlify

**Simple & Reliable**

```bash
# Via GitHub connected:
# 1. Push to GitHub
# 2. Connect at netlify.com
# 3. Auto-deploys on push

# Site: https://baichoigame.netlify.app
```

**Manual Deploy (with CLI):**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### 3. GitHub Pages

**Free hosting for GitHub users**

```bash
# Add to package.json
"deploy": "npm run build && gh-pages -d dist"

# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy

# Site: https://ngoquanhao2009.github.io/baichoigame
```

**Configuration in package.json:**
```json
{
  "homepage": "https://ngoquanhao2009.github.io/baichoigame",
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 4. Firebase Hosting

**Google's hosting platform**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Init project
firebase init hosting

# Configure:
# - Public directory: dist
# - Single page app: Yes
# - Rewrite all URLs to index.html: Yes

# Build & Deploy
npm run build
firebase deploy
```

### 5. AWS S3 + CloudFront

**Scalable & Professional**

```bash
# Build
npm run build

# Deploy to S3 bucket
aws s3 sync dist/ s3://your-bucket-name/

# Set Cache Headers
aws s3 cp dist/ s3://your-bucket-name/ \
  --recursive \
  --exclude "*" \
  --include "index.html" \
  --metadata-directive REPLACE \
  --cache-control max-age=0,no-cache,no-store,must-revalidate

aws s3 cp dist/ s3://your-bucket-name/ \
  --recursive \
  --exclude "index.html" \
  --metadata-directive REPLACE \
  --cache-control max-age=31536000,public
```

### 6. Docker + Container Hosting

**For advanced users**

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**Deploy:**
```bash
# Build image
docker build -t baichoigame .

# Run locally
docker run -p 3000:3000 baichoigame

# Push to Docker Hub
docker tag baichoigame username/baichoigame
docker push username/baichoigame

# Deploy on hosting (Railway, Heroku, etc)
```

### 7. Traditional Web Hosting

**FTP/SSH hosting (GoDaddy, Bluehost, etc)**

```bash
# 1. Build locally
npm run build

# 2. FTP/SFTP the dist/ folder to public_html/

# 3. Configure .htaccess for SPA routing:
```

**.htaccess file:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  ReployeCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 🔧 Environment Configuration

### Production Environment Variables

Create `.env.production`:

```env
VITE_API_URL=https://api.baichoigame.com
VITE_APP_NAME=Bái Chọi Game
```

Use in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🚀 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🔒 Security Checklist

- ✅ No sensitive data in code
- ✅ Environment variables for secrets
- ✅ HTTPS enabled (all platforms provide it)
- ✅ CSP headers configured
- ✅ No console logs in production
- ✅ Dependencies up to date

## 📊 Monitoring & Analytics

### Add Google Analytics

```jsx
// Add to index.html before </head>
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Performance Monitoring

```bash
# Lighthouse CI
npm install -g @lhci/cli@latest
lhci autorun
```

## 📈 Performance Optimization

### Before Deployment

```bash
# Generate performance report
npm run build

# Install Lighthouse CI
npm install -g @lhci/cli@latest

# Run audit
performance_report=$(lhci autorun)
echo $performance_report
```

### Deploy Strategy

1. **Stage deployment** - Test on staging domain
2. **Preview deploy** - Show to stakeholders
3. **Production deploy** - Go live
4. **Monitor** - Check analytics & errors

## ✅ Post-Deployment Checklist

- ✅ Test all menu interactions
- ✅ Verify sound effects work
- ✅ Check responsive on mobile/tablet
- ✅ Test in different browsers
- ✅ Verify animations smooth
- ✅ Check loading speed
- ✅ Test on slow 3G connection
- ✅ Monitor error logs

## 🆘 Troubleshooting Deployment

### Issue: Build fails on deployment

```bash
# Clear cache
rm -rf node_modules
npm install
npm run build
```

### Issue: Assets not loading

Check base URL in `vite.config.js`:
```javascript
export default {
  base: '/baichoigame/',  // if in subfolder
}
```

### Issue: SPA routing broken

Make sure `.htaccess` or server config redirects to `index.html`

### Issue: Slow performance

```bash
# Check bundle size
npm run preview

# Optimize images
npm install sharp
# Process images...

# Enable Gzip
# (Most hosting providers do this automatically)
```

## 📞 Support for Each Platform

- **Vercel**: https://vercel.com/support
- **Netlify**: https://support.netlify.com
- **GitHub Pages**: https://docs.github.com/pages
- **Firebase**: https://firebase.google.com/support
- **AWS**: https://aws.amazon.com/support

---

**Recommended**: Use **Vercel** for easiest experience - just connect GitHub and deploy! 🚀
