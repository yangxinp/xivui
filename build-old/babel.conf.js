module.exports = function (modules) {
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          modules,
        },
      ],
      "@babel/preset-typescript",
    ],
    plugins: [
      // https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md
      "@vue/babel-plugin-jsx",
      [
        "@babel/plugin-transform-runtime",
        {
          corejs: 3,
        },
      ],
    ],
  };
};
