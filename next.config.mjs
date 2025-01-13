/** @type {import('next').NextConfig} */
const nextConfig = {
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
        domains: ["res.cloudinary.com"],
    },
};

export default nextConfig;
