import type { NextConfig } from 'next';

const isGitHubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable static export when building for GitHub Pages or static hosting
  output: isGitHubPages ? 'export' : 'standalone',
  basePath: isGitHubPages ? basePath : undefined,
  assetPrefix: isGitHubPages ? (basePath ? `${basePath}/` : undefined) : undefined,
  
  images: {
    unoptimized: isGitHubPages, // GitHub Pages has no Node.js server for dynamic image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['motion'],
  webpack: (config, { dev }) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
