const path = require("path");
const express = require("express");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpackDevMiddleware = require("webpack-dev-middleware");
// https://github.com/vuejs/vue-loader/issues/1755
// https://github.com/vuejs/vue-next-webpack-preview
const { VueLoaderPlugin } = require("vue-loader");

const config = require("../build/config");

const resolve = (segment) => path.resolve(__dirname, segment);

const argv = process.argv.slice(2);
const options = {
  simple: argv.indexOf("--simple") > -1 || argv.indexOf("-S") > -1,
  disk: argv.indexOf("--disk") > -1 || argv.indexOf("-D") > -1,
};

const app = express();

function getWebpackConfig() {
  // 基础配置
  const baseWebpackConfig = {
    mode: "development",
    entry: resolve("./index.js"),
    output: {
      filename: "bundle.js",
      path: resolve("./dist"),
    },
    target: ["web"],
    devtool: "inline-source-map",
    resolve: { mainFiles: ["index"] },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /.(woff|woff2|eot|ttf|otf)$/,
          use: "file-loader",
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        title: "UI example",
        template: resolve("./index.html"),
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development"),
        // https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      }),
    ],
  };

  if (options.simple) {
    // 基础配置
    baseWebpackConfig.resolve.extensions = [".js", ".json"];
    baseWebpackConfig.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    });
  } else {
    // 可以在项目中直接引入源码调试
    baseWebpackConfig.resolve.extensions = [".tsx", ".ts", ".js", ".json"];
    baseWebpackConfig.module.rules.push({
      test: /\.s?css$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: config.postcss(),
          },
        },
        "sass-loader",
      ],
    });
    baseWebpackConfig.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: config.babel(),
      },
    });
  }

  // 写入磁盘
  if (options.disk) {
    // 写入时，清空一下
    baseWebpackConfig.plugins.push(new CleanWebpackPlugin());
  }

  return baseWebpackConfig;
}

const compiler = webpack(getWebpackConfig());

app.use(
  // 使用中间件
  webpackDevMiddleware(compiler, {
    // 将产物写入磁盘
    writeToDisk: options.disk,
  })
);

app.listen(3000, function () {
  console.log("Example app listening on port 3000!\n");
});
