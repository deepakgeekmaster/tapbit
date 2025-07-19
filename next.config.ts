/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ['https://fb23-115-97-137-20.ngrok-free.app'],

  reactStrictMode: true,
  // Disable App Router
  experimental: {
    appDir: false
  }
}

module.exports = nextConfig
