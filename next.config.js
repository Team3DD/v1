/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'drive.google.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ⚠️ Esto permite desplegar aunque haya errores de ESLint
  },
}

module.exports = nextConfig
