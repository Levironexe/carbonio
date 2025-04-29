/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gateway.pinata.cloud'],
  },
}

module.exports = nextConfig