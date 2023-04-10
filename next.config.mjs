/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'js'],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  transpilePackages: ['react-tweet'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
    ],
    domains: [
      'ik.imagekit.io',
      's3.us-west-2.amazonaws.com',
      'www.notion.so',
      'images.unsplash.com',
    ],
  },
}

export default nextConfig
