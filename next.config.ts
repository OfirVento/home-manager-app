import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: '/home-manager-app', // Disable this for now as user might not want subpath, or user can fix if assets break. Actually usually safer to omit if custom domain, but for gh-pages repo slug is needed usually.
  // Actually, standard practice for project pages is basePath = /repo-name.
  basePath: '/home-manager-app',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
