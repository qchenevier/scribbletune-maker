const merge = require("webpack-merge");
const mainConfig = require("./webpack.config.js");
const CnameWebpackPlugin = require("cname-webpack-plugin");

module.exports = merge(mainConfig, {
  mode: "production",
  plugins: [
    new CnameWebpackPlugin({
      domain: "scribbleton.live"
    })
  ],
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
