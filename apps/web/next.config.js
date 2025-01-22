/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/design-system', '@repo/observability'],
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
