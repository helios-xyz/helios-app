import { config } from '@repo/next-config';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  ...config,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.basehub.com',
      },
    ],
  },
};

export default nextConfig;
