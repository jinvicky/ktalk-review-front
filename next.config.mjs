/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  reactStrictMode: false,
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:8080"; // 로컬 기본 값

    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns:
      [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: undefined,
          pathname: undefined,
          search: undefined,
        },
      ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/promotion',
        permanent: true
      }
    ]
  }
};

export default nextConfig;
