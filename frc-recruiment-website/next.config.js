/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Base path - set to empty string for custom domains at root
  basePath: '',
}

module.exports = nextConfig
