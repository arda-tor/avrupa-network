import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker icin: kucuk, kendi kendine yeten sunucu cikti (.next/standalone).
  output: "standalone",
};

export default nextConfig;
