import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: ["randomuser.me"], // ✅ Add your external image domain here
  },
};

export default nextConfig;
