const path = require("path");

module.exports = {
  stories: ["../src/components/**/*.stories.tsx"],
  webpackFinal: async (config, { configType }) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.module.rules.push(
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        include: path.resolve(__dirname, "../src")
      },
      {
        test: /\.sass$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../src")
      }
    );

    return config;
  }
};
