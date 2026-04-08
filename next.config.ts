import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        // source: "/api/graphql",
        source: process.env.NEXT_PUBLIC_GRAPHQL_API || "/api/graphql",
        destination: "https://devapi.waltonplaza.com.bd/graphql",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.waltonplaza.com.bd",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
