const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = require("./config");

const resolve = (segment) => path.resolve(__dirname, segment);

const compiler = webpack({
  mode: "production",
  entry: {
    index: resolve("../index.ts")
  },
  output: {
    filename: "[name].js",
    path: resolve("../dist/"),
    publicPath: "./",
    library: "XiVui",
    libraryTarget: "umd",
  },
  devtool: false,
  externals: {
    vue: {
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
      root: "Vue",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: config.postcss(),
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: config.babel(),
        },
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
    new MiniCssExtractPlugin(),
  ],
});

compiler.run((err, status) => {
  // if (err || status.hasErrors()) {
  //   const info = status.toJson()
  //   console.error(info.errors);
  // }

  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = status.toJson();

  if (status.hasErrors()) {
    console.log("--errors--");
    info.errors.forEach((item) => {
      console.warn(item.message);
    });
  }

  if (status.hasWarnings()) {
    console.log("--warnings--");
    info.warnings.forEach((item) => {
      console.warn(item.message);
    });
  }

  compiler.close((closeError) => {
    console.log(closeError);
  });
});
