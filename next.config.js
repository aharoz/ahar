/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  i18n: {
    locales: ['tr', 'en'],
    defaultLocale: 'tr'
  }
}

module.exports = nextConfig 
