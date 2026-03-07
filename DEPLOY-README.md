# 🚀 BNS Deployment Roadmap
# TypeScript Next.js 16 + Node.js 24.13.0 → cPanel

This comprehensive roadmap provides step-by-step instructions for building and deploying your TypeScript Next.js 16 application with Node.js 24.13.0+ to cPanel using the **standalone output** method. This approach avoids all the memory/LVE issues typically encountered on shared cPanel hosting.

---

## 📋 Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | >= 24.13.0 | Required for this project |
| Package Manager | npm | Avoid pnpm on cPanel (resource heavy) |
| Next.js | 16.x | Latest stable via `next: latest` |
| cPanel | Latest | With Node.js Selector |

---

## 📁 Project Structure

```
bns/
├── .env.production.local     # Production env vars
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions for automated deploy
├── next.config.ts            # TypeScript config (optimized for cPanel)
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── public/                   # Static assets
├── src/
│   ├── app/                  # Next.js 16 App Router
│   ├── components/
│   └── lib/
├── scripts/
│   ├── copy-assets.js        # Post-build asset copier
│   └── deploy-prep.js        # Deployment preparation
└── deploy/                   # Generated deployment package
```

---

## ⚙️ Configuration Files

### next.config.ts (Optimized for cPanel)

The [`next.config.ts`](next.config.ts) has been configured with:

- **`output: 'standalone'`** - Creates self-contained deployment
- **`images.unoptimized: true`** - Avoids sharp dependency issues
- **Experimental optimizations** - Reduces memory footprint
- **Production settings** - Disables source maps, enables compression

### package.json (Build Scripts)

Updated scripts in [`package.json`](package.json):

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:local": "npm run build && npm run copy-assets",
    "start": "NODE_ENV=production node server.js",
    "copy-assets": "node scripts/copy-assets.js",
    "deploy:prep": "node scripts/deploy-prep.js"
  }
}
```

---

## 🔧 Build & Deployment Scripts

### scripts/copy-assets.js

Post-build script that:
1. Copies `.next/static` to standalone folder
2. Copies `public/` assets to standalone folder
3. Creates production `server.js` entry point
4. Generates minimal `package.json` for production

### scripts/deploy-prep.js

Deployment preparation script that:
1. Creates a `deploy/` folder
2. Copies standalone build contents
3. Generates `.htaccess` for cPanel routing
4. Creates `.env.example` for reference
5. Generates detailed `DEPLOY.md` instructions

---

## 📦 Local Build Process

### Step 1: Clean Install

```bash
# Navigate to project directory
cd /home/gunzo/Desktop/GR8/bns

# Clean previous builds
rm -rf node_modules package-lock.json .next deploy

# Install dependencies
npm install
```

### Step 2: Build with Asset Copy

```bash
# Build Next.js and copy assets to standalone folder
npm run build:local
```

### Step 3: Prepare Deployment Package

```bash
# Create deploy folder with all necessary files
npm run deploy:prep
```

### What Gets Built

```
.next/
├── standalone/           # ← Upload this folder's contents
│   ├── server.js         # Entry point
│   ├── package.json      # Minimal production deps
│   ├── .next/
│   │   ├── static/       # JS/CSS chunks
│   │   └── ...
│   ├── public/           # Static assets
│   └── node_modules/     # Production dependencies
├── static/               # Copied to standalone
└── ...

deploy/                   # ← Alternative: Upload this folder
├── server.js
├── package.json
├── .htaccess
├── .env.example
├── DEPLOY.md
├── .next/
├── public/
└── node_modules/
```

---

## ☁️ cPanel Deployment

### Option A: Manual Upload

1. **Zip the deploy folder**:
   ```bash
   cd deploy
   zip -r ../bns-deploy.zip .
   ```

2. **Upload via cPanel File Manager**:
   - Navigate to `File Manager`
   - Go to your app directory (outside `public_html`)
   - Upload and extract `bns-deploy.zip`

3. **Configure Node.js App**:
   - Go to cPanel → **Setup Node.js App**
   - Create Application:
     | Setting | Value |
     |---------|-------|
     | Node.js version | 20.x or 22.x |
     | Application mode | Production |
     | Application root | `/home/username/your-app` |
     | Application URL | `yourdomain.com` |
     | Startup file | `server.js` |

4. **Set Environment Variables**:
   In cPanel Node.js Selector → Environment Variables:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   RESEND_API_KEY=your_resend_key
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   NODE_ENV=production
   ```

5. **Install Dependencies & Start**:
   - Click "Run NPM Install"
   - Click "Start App"

### Option B: GitHub Actions (Automated)

The [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) provides automated deployment:

1. **Configure GitHub Secrets**:
   - Go to your GitHub repo → Settings → Secrets and variables
   - Add these secrets:
     | Secret | Value |
     |--------|-------|
     | FTP_SERVER | Your cPanel hostname (e.g., server123.hosting.com) |
     | FTP_USERNAME | Your cPanel username |
     | FTP_PASSWORD | Your FTP/cPanel password |
   
2. **Configure GitHub Variables**:
   - Add these variables:
     | Variable | Value |
     |----------|-------|
     | NEXT_PUBLIC_SUPABASE_URL | Your Supabase URL |
     | NEXT_PUBLIC_SUPABASE_ANON_KEY | Your anon key |
     | NEXT_PUBLIC_APP_URL | https://yourdomain.com |
     | CPANEL_APP_DIRECTORY | /home/username/your-app |

3. **Deploy**:
   - Push to `main` branch
   - GitHub Actions will build and deploy automatically

---

## � Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| `EAGAIN` / Worker init failed | Build locally, don't build on cPanel |
| `sharp` missing error | Already using `images.unoptimized: true` |
| `module not found` | Ensure `npm install --production` ran |
| Port already in use | Use `process.env.PORT` (not hardcoded) |
| 404 on refresh | Ensure `.htaccess` is uploaded |
| Out of memory | Build locally with `NODE_OPTIONS="--max-old-space-size=4096"` |

### Common cPanel Issues

1. **LVE Limits Exceeded**
   - Symptom: Process killed during build
   - Solution: Always build locally, never on cPanel

2. **Wrong Node.js Version**
   - Symptom: Syntax errors or module issues
   - Solution: Use 20.x or 22.x (closest to 24.x available)

3. **Missing Environment Variables**
   - Symptom: App starts but features don't work
   - Solution: Add all vars in cPanel Node.js Selector

4. **Static Assets Not Loading**
   - Symptom: CSS/JS 404 errors
   - Solution: Ensure `public/` was copied to standalone folder

---

## 🔄 Key Differences from Traditional Deployment

| Traditional (Failed) | This Roadmap (Working) |
|---------------------|------------------------|
| Build on cPanel | Build locally with Node.js 24 |
| Basic Express server | Next.js native server.js |
| Full node_modules | Standalone trimmed node_modules |
| pnpm (heavy) | npm (lightweight) |
| Memory errors | Optimized for shared hosting |

---

## 📝 Environment Variables Reference

### Required Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Resend (Email)
RESEND_API_KEY=re_123456789

# Application
NEXT_PUBLIC_APP_URL=https://budgetndiostory.org
NODE_ENV=production
```

### Optional Variables

```bash
# Analytics (if using)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_CHATBOT=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

---

## 🚦 Deployment Checklist

- [ ] Node.js 24.13.0+ installed locally
- [ ] Dependencies installed with `npm install`
- [ ] Build succeeds with `npm run build:local`
- [ ] Deploy package created with `npm run deploy:prep`
- [ ] cPanel Node.js app configured
- [ ] Environment variables set in cPanel
- [ ] App started in cPanel
- [ ] Domain pointing to cPanel app
- [ ] SSL certificate configured (recommended)

---

## 📞 Support

If you encounter issues:

1. Check cPanel error logs: `stderr.log` in Node.js Selector
2. Verify environment variables are set correctly
3. Ensure you're using the correct Node.js version
4. Build locally first to catch any build errors

---

## 📄 Files Created/Modified

| File | Action | Description |
|------|--------|-------------|
| `next.config.ts` | Modified | Added cPanel optimizations |
| `package.json` | Modified | Added build:local and deploy:prep scripts |
| `scripts/copy-assets.js` | Created | Post-build asset copier |
| `scripts/deploy-prep.js` | Created | Deployment package creator |
| `.github/workflows/deploy.yml` | Created | GitHub Actions workflow |
| `DEPLOY-README.md` | Created | This documentation |

---

Built with Next.js 16 + Node.js 24.13.0 for cPanel deployment.
