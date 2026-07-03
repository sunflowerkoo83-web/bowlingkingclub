import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      // 스마트폰 사진은 수 MB에 달하는 경우가 많아 기본 1MB 제한을 상향
      bodySizeLimit: "8mb",
    },
  },
};

export default nextConfig;
