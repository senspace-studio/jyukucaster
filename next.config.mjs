/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  functions: {
    'src/pages/api/**/*': {
      maxDuration: 300,
    },
  },
}

export default nextConfig
