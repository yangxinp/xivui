const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// https://github.com/vuejs/vue-loader/issues/1755
// https://github.com/vuejs/vue-next-webpack-preview
const { VueLoaderPlugin } = require("vue-loader");

const resolve = (f) => path.resolve(__dirname, f);

module.exports = {
  mode: "development",
  entry: resolve("../dev/index.js"),
  output: {
    filename: "bundle.js",
    path: resolve("../dev/dist/"),
  },
  // https://github.com/webpack/webpack-dev-server/issues/2758
  target: "web",
  devtool: "inline-source-map",
  devServer: {
    // [WDS] log
    // https://github.com/webpack/webpack-dev-server/issues/2509
    contentBase: resolve("../dev/dist"),
    stats: "minimal",
    hot: true,
    overlay: true,
  },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: "file-loader",
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "UI example",
      template: resolve("../dev/index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      // https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
  ],
};
