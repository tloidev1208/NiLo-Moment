import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Cấu hình Webpack (nếu cần tùy chỉnh)
  webpack: (config) => {
    return config;
  },

  // Tắt Turbopack bằng cách cấu hình trống
  turbopack: {},
};

export default nextConfig;
