import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["assets.ajio.com", "cdn.shopify.com","assets.newme.asia"],
  },
  output: 'export'
};

export default nextConfig;
