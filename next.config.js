const withPlugins = require("next-compose-plugins");

const nextPlugins = [];

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.doc\.md$/,
      use: [
        {
          loader: "raw-loader",
        },
      ],
    });
    return config;
  },
};

module.exports = withPlugins(nextPlugins, nextConfig);
