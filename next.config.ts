import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: "/ui", // Replace REPO_NAME with your actual repository name
  assetPrefix: "/ui/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
