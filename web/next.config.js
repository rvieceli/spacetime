/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4004",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${process.env.BACKEND_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
