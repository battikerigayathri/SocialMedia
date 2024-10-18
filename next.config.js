/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['via.placeholder.com', 's3.ap-south-1.amazonaws.com']
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
};
module.exports = nextConfig
