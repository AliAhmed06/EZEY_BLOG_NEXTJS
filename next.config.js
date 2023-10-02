module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'ezey-blog-nextjs.vercel.app/:path*',
          },
        ]
    },
};