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
      },
    );

    // remove svg from existing rule
    config.module.rules = config.module.rules.map(rule => {
      if (
        String(rule.test) ===
        String(/\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/)

      ) {
        return {
          ...rule,
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
        }
      }

      return rule
    })

    config.module.rules.unshift({
      test: /\.(svg)$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  }
};
