/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  images: {
    domains: [
      'ik.imagekit.io',
      's3.us-west-2.amazonaws.com',
      'www.notion.so',
      'images.unsplash.com',
    ],
  },
}

// /** @type {import('plaiceholder/next').withPlaiceholder} */
// const { withPlaiceholder } = {}

// module.exports = withPlaiceholder({
//   // your Next.js config
// })

export default nextConfig
