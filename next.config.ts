import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/es/:path*", destination: "/:path*", permanent: true },
      { source: "/LLM.txt", destination: "/llms.txt", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};
export default nextConfig;
