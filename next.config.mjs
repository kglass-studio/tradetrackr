/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["wdiftjkjxkfrmzffnxsa.supabase.co"],
  },
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
