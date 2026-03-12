import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Output: standalone for cPanel deployment
  output: 'standalone',
  distDir: '.next',

  // Disable type checking during build (faster, less memory)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization
  images: {
    unoptimized: true,
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

  // Production optimizations
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;