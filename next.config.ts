import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // <-- Ensures route folders have index.html
  images: {
    unoptimized: true, // Required for static export if you use Next <Image />
  },
};

export default nextConfig;