/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true,
  //   }
  //   return config
  // },
}

module.exports = nextConfig
