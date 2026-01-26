import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Only use basePath in production (GitHub Pages) so localhost:3000 works at root
  basePath: process.env.NODE_ENV === 'production' ? '/home-manager-app' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
