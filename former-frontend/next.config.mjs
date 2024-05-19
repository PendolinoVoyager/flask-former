/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2500kb",
    },
  },
};

export default nextConfig;
