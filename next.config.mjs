/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ["192.168.10.58"],
  },
  async rewrites() {
    return [
      {
        source: "/cdn/:path*",
        destination: "http://192.168.10.58/cdn/:path*", // your Nginx-served CDN
      },
    ];
  },
};

export default nextConfig;
