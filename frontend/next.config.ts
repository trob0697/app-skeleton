import type { NextConfig } from "next";
import path from "path";

const ENV = process.env.ENV!;
const BACKEND_URL = process.env.BACKEND_URL!;

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    if (!ENV) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
