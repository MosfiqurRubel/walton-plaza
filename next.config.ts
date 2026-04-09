import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api/graphql", // Always static
        destination: "https://devapi.waltonplaza.com.bd/graphql",
      },
    ];
  },

  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "cdn.waltonplaza.com.bd",
      //   pathname: "/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "devcdn.waltonplaza.com.bd",
      //   pathname: "/**",
      // },
      {
        protocol: "https",
        hostname: "**.waltonplaza.com.bd",
      },
    ],
  },
};

export default nextConfig;
