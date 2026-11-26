import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: ["*.airoapp.ai", "*.preview.c40.airoapp.ai"],
};

export default nextConfig;
