const webpack = require("webpack");
const merge = require("webpack-merge");
const mainConfig = require("./webpack.config.js");

module.exports = merge(mainConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
