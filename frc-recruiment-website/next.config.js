/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Base path for GitHub Pages
  basePath: '/frc-website',
}

module.exports = nextConfig
