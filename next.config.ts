import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  api: {
    bodyParser: false
  },
  serverRuntimeConfig: {
    maxBodySize: '10mb',
  }
};

export default nextConfig;
