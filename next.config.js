/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'fygkskorgvtqqitnzwuy.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig