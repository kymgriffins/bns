import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output: standalone for cPanel deployment
  output: 'standalone',
  distDir: '.next',

  // Disable type checking during build (faster, less memory)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization (disable for cPanel to avoid sharp issues)
  images: {
    unoptimized: true, // Required for standalone on shared hosting
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // Experimental: Reduce memory usage for resource-limited environments
  experimental: {
    workerThreads: false, // Disable workers (avoids EAGAIN)
    cpus: 1, // Single CPU for cPanel LVE limits
    webpackMemoryOptimizations: true, // Reduce memory footprint
    serverSourceMaps: false, // Disable source maps
  },

  // Production optimizations
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;