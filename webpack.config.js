const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader" },
      { test: /\.vue$/, use: "vue-loader" },
      { test: /\.css$/, use: ["vue-style-loader", "css-loader"] },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|woff|woff2|otf|eot)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new VueLoaderPlugin()
  ],
  node: {
    fs: "empty"
  },
  // Need vue with the template compiler to use vue-router: https://stackoverflow.com/a/47332729/7539771
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"
    }
  }
};
