/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/porqueaventrada",
        destination: "/por-que-aventrada",
        permanent: true,
      },
      {
        source: "/porque-aventrada",
        destination: "/por-que-aventrada",
        permanent: true,
      },
      {
        source: "/porque",
        destination: "/por-que-aventrada",
        permanent: true,
      },
      {
        source: "/auth/login",
        destination: "/auth/signin",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
