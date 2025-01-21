const { config } = require('@repo/next-config');

/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
