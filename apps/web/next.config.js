import { config } from '@repo/next-config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...config,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.basehub.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
