/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["s3.ap-south-1.amazonaws.com"]
  }
};
export default nextConfig;
