const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PRO = "production"
const DEV = "development"

const resolve = f => path.resolve(__dirname, f);

function config () {
  const env = process.env.NODE_ENV ?? DEV

  const rules = [
    {
      test: /\.s[ac]ss/,
      use: [
        env === PRO ? MiniCssExtractPlugin.loader : "style-loader",
        "css-loader",
        "sass-loader",
      ],
    },
    {
      test: /\.[tj]sx?$/,
      exclude: /node_modules/,
      use: "babel-loader",
    },
  ]

  const plugins = [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env),
      // https://github.com/vuejs/vue-next/tree/master/packages/vue#bundler-build-feature-flags
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
  ]

  if (env === PRO) {
    plugins.push(new MiniCssExtractPlugin())
  }

  const conf = {
    mode: env,
    entry: env === PRO
      ? resolve('./entry.js')
      : resolve('../dev/index.tsx'),
    output: env === PRO
      ? {
        filename: "[name].js",
        path: resolve("../dist/"),
        library: "ui",
        libraryTarget: "umd",
      }
      : {
        filename: "bundle.js",
        path: resolve("../dev/dist/"),
      },
    module: { rules },
    devtool: env === PRO ? false : "inline-source-map",
    externals: env === PRO ? {
      vue: {
        commonjs: "vue",
        commonjs2: "vue",
        amd: "vue",
        root: "Vue",
      }
    } : undefined,
    resolve: { extensions: [".tsx", ".ts", ".js"] }
  }

  return conf
}

function build (cb) {
  process.env.NODE_ENV = PRO

  webpack(config(), (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      if (cb) cb(err)
      return;
    }
  
    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }
  
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log(stats.toString({
      colors: true
    }))

    if (cb) cb()
  })
}

module.exports = { config, build }