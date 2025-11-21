/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-strapi-backend-xkpg.onrender.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;