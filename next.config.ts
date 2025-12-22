import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
