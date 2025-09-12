import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  distDir: "docs",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: "/lucky-pdd",
  // assetPrefix: "/lucky-pdd",
};

export default nextConfig;
