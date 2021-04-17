const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");

const nextPlugins = [withOptimizedImages];

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.doc\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};

module.exports = withPlugins(nextPlugins, nextConfig);
