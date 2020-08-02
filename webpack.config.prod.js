const merge = require("webpack-merge");
const mainConfig = require("./webpack.config.js");

module.exports = merge(mainConfig, {
  mode: "production",
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
