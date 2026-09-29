/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emits .next/standalone — a self-contained server.js plus only the
  // node_modules it actually needs. Required for the Docker/Container Apps
  // path and much lighter to ship to App Service.
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["three"],
};

export default nextConfig;
