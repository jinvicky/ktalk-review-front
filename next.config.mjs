/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return  {
      source: '/api/:path*',
      destination: 'http://localhost:8080/api/:path*',
    }
  }, 
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
