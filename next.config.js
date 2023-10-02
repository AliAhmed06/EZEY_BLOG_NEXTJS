/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'ezey-blog-nextjs.vercel.app/:path*',
          },
        ]
    },
}

module.exports = nextConfig
