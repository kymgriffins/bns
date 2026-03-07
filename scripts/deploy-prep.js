#!/usr/bin/env node
/**
 * scripts/deploy-prep.js
 * 
 * Deployment preparation script for cPanel.
 * Creates a deploy folder with all necessary files for cPanel deployment.
 * 
 * Run after: npm run build:local
 * Usage: node scripts/deploy-prep.js
 */

const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const deployDir = path.join(projectRoot, 'deploy');

console.log('🚀 Preparing deployment package...\n');

// Clean and create deploy directory
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true });
}
fs.mkdirSync(deployDir, { recursive: true });

const standaloneDir = path.join(projectRoot, '.next', 'standalone');

if (!fs.existsSync(standaloneDir)) {
  console.error('❌ .next/standalone not found. Run "npm run build:local" first.');
  console.error('\nRun these commands first:');
  console.error('  npm install');
  console.error('  npm run build:local');
  process.exit(1);
}

// Copy standalone contents to deploy folder
fs.cpSync(standaloneDir, deployDir, { recursive: true });
console.log('✅ Standalone build copied to deploy/');

// Create .htaccess for cPanel (if using subdirectory deployment)
const htaccess = `# .htaccess for cPanel Node.js deployment
# This file helps route requests to your Node.js application

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite for static files
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Proxy to Node.js application
  RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
`;

fs.writeFileSync(path.join(deployDir, '.htaccess'), htaccess);
console.log('✅ .htaccess created for cPanel routing');

// Create .env.example for reference
const envExample = `# Environment Variables Template
# Copy these to your cPanel Node.js application settings

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend (for emails)
RESEND_API_KEY=your_resend_api_key

# Application
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
`;

fs.writeFileSync(path.join(deployDir, '.env.example'), envExample);
console.log('✅ .env.example created for reference\n');

// Create deployment instructions
const instructions = `# cPanel Deployment Instructions

## Quick Start

1. **Build locally** (avoids cPanel resource limits):
   \`\`\`bash
   npm install
   npm run build:local
   npm run deploy:prep
   \`\`\`

2. **Upload to cPanel**:
   - Zip the \`deploy/\` folder contents
   - Upload via cPanel File Manager to your app directory
   - Extract the files

3. **Configure in cPanel**:
   - Go to: cPanel → Setup Node.js App
   - Create or edit your application:
     - Node.js version: \`20.x\` or \`22.x\` (closest to your local 24.x)
     - Application mode: \`Production\`
     - Application root: \`/home/username/your-app-directory\`
     - Application URL: \`yourdomain.com\`
     - Startup file: \`server.js\`
   - Click "Run NPM Install" (production only)
   - Click "Start App"

## Environment Variables

Add these in cPanel Node.js Selector → Environment Variables:

| Variable | Value |
|----------|-------|
| NEXT_PUBLIC_SUPABASE_URL | Your Supabase URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Your Supabase anon key |
| RESEND_API_KEY | Your Resend API key |
| NEXT_PUBLIC_APP_URL | https://yourdomain.com |
| NODE_ENV | production |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| App won't start | Check stderr.log in cPanel |
| 404 on refresh | Ensure .htaccess is uploaded |
| Module not found | Run \`npm install --production\` in cPanel |
| Port error | Use \`process.env.PORT\` (cPanel assigns port) |
| Out of memory | Build locally, not on cPanel |

## Files Structure After Upload

\`\`\`
your-app-directory/
├── .htaccess
├── .next/
│   ├── static/
│   └── ...
├── public/
│   └── ...
├── node_modules/
├── package.json
├── server.js
└── .env (or set via cPanel)
\`\`\`

## Important Notes

- **Build Locally**: Never build on cPanel shared hosting - it will fail due to LVE limits
- **Use npm**: Avoid pnpm on cPanel (resource heavy)
- **Standalone Output**: This deployment uses Next.js standalone mode for minimal footprint
- **Static Assets**: Public folder and .next/static are automatically included

## Post-Deployment

After uploading and starting the app:

1. Test your site at \`https://yourdomain.com\`
2. Check cPanel "Setup Node.js App" for running status
3. Monitor stderr.log for any errors
4. Set up custom domain if needed in cPanel

---

Generated for BNS Project - TypeScript Next.js 16 + Node.js 24.13.0
`;

fs.writeFileSync(path.join(deployDir, 'DEPLOY.md'), instructions);
console.log('✅ Deployment instructions created (DEPLOY.md)\n');

console.log(`🎉 Deployment package ready at: ${deployDir}/`);
console.log('\n📤 Next step: Upload deploy/ folder contents to cPanel\n');
