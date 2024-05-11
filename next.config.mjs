/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/feed',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    console.log(process.env.NEXT_PUBLIC_API_URL)
    return [
      {
        source: '/api',
        destination: process.env.NEXT_PUBLIC_API_URL + '/api',
      },
    ]
  },
}

export default nextConfig
