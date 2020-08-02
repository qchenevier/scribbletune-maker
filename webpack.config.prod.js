const merge = require("webpack-merge");
const mainConfig = require("./webpack.config.js");

module.exports = merge(mainConfig, {
  mode: "production",
  router: {
    base: "/scribbletune-maker/"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  }
});
