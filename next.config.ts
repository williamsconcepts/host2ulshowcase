import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      // Direct root visitors to showcase if desired
      {
        source: "/",
        destination: "/showcase",
        permanent: false,
      },
      // WordPress legacy URL aliases if any had trailing slash or custom prefixes
      {
        source: "/portfolio",
        destination: "/showcase",
        permanent: true,
      },
      {
        source: "/portfolio/:slug",
        destination: "/showcase/:slug",
        permanent: true,
      },
      {
        source: "/project/:slug",
        destination: "/showcase/:slug",
        permanent: true,
      },
      {
        source: "/projects/:slug",
        destination: "/showcase/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

