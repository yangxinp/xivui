const path = require("path");
const rimraf = require("rimraf");
const through = require("through2");
const { src, dest } = require("gulp");

const babel = require("@babel/core");
const sass = require("sass");
const postcss = require("postcss");

const config = require("./config");

function compileStyle(dir) {
  src(["src/**/*.scss", "!src/**/_*.scss"])
    .pipe(
      through.obj((chunk, encoding, next) => {
        const result = sass.renderSync({ file: chunk.path });
        chunk.contents = result.css;
        chunk.extname = ".css";
        next(null, chunk);
      })
    )
    .pipe(
      through.obj((chunk, encoding, next) => {
        const { plugins } = config.postcss();
        const content = chunk.contents.toString(encoding);

        postcss(plugins)
          .process(content, { from: chunk.path })
          .then((result) => {
            chunk.contents = Buffer.from(result.css);
            next(null, chunk);
          });
      })
    )
    .pipe(dest(dir));
}

function compileTS(module, dir) {
  src(["src/**/*.tsx", "src/**/*.ts", "src/**/*.js"])
    .pipe(
      through.obj((chunk, encoding, next) => {
        const content = chunk.contents.toString(encoding);

        const result = babel.transformSync(content, {
          ...config.babel(module),
          filename: chunk.basename,
        });

        if (result.code) {
          // components/*/style/index.ts 需要替换 scss 文件路径
          if (/[\\/]style[\\/]index\.ts$/.test(chunk.path)) {
            result.code = result.code.replace(/\.scss/g, ".css");
          }

          // components/Icon/style/index.ts 引入的 icon 需要调整路径
          if (/[\\/]Icon[\\/]style[\\/]index.ts$/.test(chunk.path)) {
            // .scss 已经在上方处理了
            result.code = result.code.replace(
              "@mdi/font/scss",
              "@mdi/font/css"
            );
          }
        } else {
          console.log(`请检查 ${chunk.path} 是否为空文件`);
        }

        chunk.contents = Buffer.from(result.code);
        chunk.extname = ".js";
        next(null, chunk);
      })
    )
    .pipe(dest(dir));
}

function compile(module) {
  const dir = path.join(__dirname, module === false ? "../es" : "../lib");

  rimraf.sync(dir);

  compileStyle(dir);
  compileTS(module, dir);
}

compile(false);
compile();
