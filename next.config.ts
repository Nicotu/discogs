import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.discogs.com",
      },
      {
        protocol: "https",
        hostname: "st.discogs.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    DISCOGS_CONSUMER_KEY: process.env.DISCOGS_CONSUMER_KEY,
    DISCOGS_CONSUMER_SECRET: process.env.DISCOGS_CONSUMER_SECRET,
  },
};

export default nextConfig;
