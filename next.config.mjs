/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'js'],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'ik.imagekit.io',
      's3.us-west-2.amazonaws.com',
      'www.notion.so',
      'images.unsplash.com',
    ],
  },
}

export default nextConfig
