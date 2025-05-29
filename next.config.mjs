/** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
// }

// export default nextConfig

const nextConfig = {
  experimental: {
    appDir: true,
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
  // Add this:
  //clientComponents: ['./app/(app)/clients/new/page.tsx'],
};

export default nextConfig;
