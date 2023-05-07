const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const resolve = file => path.resolve(__dirname, file)

module.exports = {
  // mode: 'none',
  mode: 'development',
  // mode: "production",
  entry: './dev/index.tsx',
  output: {
    filename: 'bundle.js',
    path: resolve('../dev/dist/'),
  },
  devtool: false,
  // target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.s[ac]ss/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "UI example",
      template: "./dev/index.html",
    }),
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify("development"),
    //   // https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
    //   __VUE_OPTIONS_API__: JSON.stringify(true),
    //   __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    // }),
    // new BundleAnalyzerPlugin()
  ],
}