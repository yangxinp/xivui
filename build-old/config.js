function babel(modules) {
  const env = ["@babel/preset-env", { modules }];
  const typescript = "@babel/preset-typescript";
  // https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md
  const jsx = "@vue/babel-plugin-jsx";
  const runtime = ["@babel/plugin-transform-runtime", { corejs: 3 }];

  return {
    presets: [env, typescript],
    plugins: [jsx, runtime],
  };
}

function postcss() {
  return {
    plugins: [require("autoprefixer")],
  };
}

module.exports = { babel, postcss };
