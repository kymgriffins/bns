#!/usr/bin/env node
/**
 * scripts/copy-assets.js
 * 
 * Post-build asset copier for cPanel standalone deployment.
 * Copies static assets to the standalone folder after Next.js build.
 * 
 * Run after: npm run build
 * Usage: node scripts/copy-assets.js
 */

const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const standaloneDir = path.join(projectRoot, '.next', 'standalone');
const staticSrc = path.join(projectRoot, '.next', 'static');
const publicSrc = path.join(projectRoot, 'public');

console.log('🚀 Starting post-build asset copy...\n');

// Ensure standalone directory exists
if (!fs.existsSync(standaloneDir)) {
  console.error('❌ .next/standalone directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Copy .next/static → .next/standalone/.next/static
const staticDest = path.join(standaloneDir, '.next', 'static');
if (fs.existsSync(staticSrc)) {
  if (!fs.existsSync(staticDest)) {
    fs.mkdirSync(staticDest, { recursive: true });
  }
  fs.cpSync(staticSrc, staticDest, { recursive: true, force: true });
  console.log('✅ Static assets copied (.next/static)');
} else {
  console.log('⚠️  No .next/static directory found');
}

// Copy public → .next/standalone/public
const publicDest = path.join(standaloneDir, 'public');
if (fs.existsSync(publicSrc)) {
  if (!fs.existsSync(publicDest)) {
    fs.mkdirSync(publicDest, { recursive: true });
  }
  fs.cpSync(publicSrc, publicDest, { recursive: true, force: true });
  console.log('✅ Public assets copied (public/)');
} else {
  console.log('⚠️  No public directory found');
}

// Read package.json to get dependencies
const packageJsonPath = path.join(projectRoot, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Extract only production dependencies
const prodDependencies = {};
if (packageJson.dependencies) {
  Object.keys(packageJson.dependencies).forEach(dep => {
    // Only include runtime dependencies, not devDependencies
    if (!packageJson.devDependencies || !packageJson.devDependencies[dep]) {
      prodDependencies[dep] = packageJson.dependencies[dep];
    }
  });
}

// Create production server.js in standalone folder
const serverCode = `const { createServer } = require('http');
const { parse } = require('url');
const { existsSync } = require('fs');
const { join, dirname } = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

// Determine the correct directory for Next.js
// For standalone deployment, we need to find the project root
let nextDir = __dirname;

// Check if we're in standalone mode - go up to project root
const standaloneDir = join(__dirname, '.next', 'standalone');
if (existsSync(standaloneDir)) {
  // We're in standalone mode - go up to project root where .next folder is
  nextDir = dirname(dirname(join(__dirname, '.next')));
} else if (existsSync(join(__dirname, 'next.config.js')) || existsSync(join(__dirname, 'next.config.ts'))) {
  // We're in project root with standard Next.js setup
  nextDir = __dirname;
}

console.log('📍 Next.js directory:', nextDir);
console.log('📍 Running from:', __dirname);

const app = next({ dev, hostname, port, dir: nextDir });
const handle = app.getRequestHandler();

// Graceful shutdown
const shutdown = () => {
  console.log('🛑 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      
      // Add security headers
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.removeHeader('X-Powered-By');
      
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log('🚀 Ready on http://' + hostname + ':' + port);
    console.log('📍 Next.js dir:', nextDir);
  });
});
`;

fs.writeFileSync(path.join(standaloneDir, 'server.js'), serverCode);
console.log('✅ Production server.js created\n');

// Create minimal package.json for production
const prodPackage = {
  name: packageJson.name || "nextjs-app",
  version: packageJson.version || "1.0.0",
  private: true,
  scripts: {
    "start": "NODE_ENV=production node server.js"
  },
  dependencies: prodDependencies
};

fs.writeFileSync(
  path.join(standaloneDir, 'package.json'),
  JSON.stringify(prodPackage, null, 2)
);
console.log('✅ Production package.json created\n');

console.log('🎉 Build preparation complete!');
console.log(`📦 Standalone output ready at: ${standaloneDir}`);
console.log('\nNext steps:');
console.log('  1. Upload .next/standalone/ contents to cPanel');
console.log('  2. Set startup file to server.js in Node.js Selector');
console.log('  3. Start the application\n');
