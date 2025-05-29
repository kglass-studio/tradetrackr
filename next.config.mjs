/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'react-dom/server': import.meta.resolve('react-dom/server'),
      };
      config.externals = [...(config.externals || []), '@supabase/supabase-js'];
    }
    return config;
  },
};

export default nextConfig;