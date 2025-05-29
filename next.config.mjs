/** @type {import('next').NextConfig} */
const nextConfig = {
  // No experimental block
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'react-dom/server': import.meta.resolve('react-dom/server'),
      };
    }
    return config;
  },
};

export default nextConfig;