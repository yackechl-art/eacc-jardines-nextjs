import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/servicios/instalacion-de-cesped-natural-y-artificial", destination: "/servicios/instalacion-de-cesped-natural-y-en-tepe", permanent: true },
      { source: "/es/:path*", destination: "/:path*", permanent: true },
      { source: "/LLM.txt", destination: "/llms.txt", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};
export default nextConfig;
