const path = require("path");
const fs = require("fs");
const fg = require("fast-glob");
const ts = require("typescript");

function compileDTS(modules) {
  // 路径
  const output = modules === false ? "es" : "lib";

  // 获取 src 下的所有需要编译声明文件的文件名
  const fileNames = fg.sync(
    [
      "src/**/*.tsx",
      "src/**/*.ts",
      "src/**/*.js",
      "!src/**/*.d.ts",
      "!src/components/*/style/*",
      "!src/components/styles.ts",
    ],
    { absolute: true }
  );

  // typescript 配置
  const options = {
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true,
  };

  // 创建一个程序
  const createdFiles = {};
  const host = ts.createCompilerHost(options);
  host.writeFile = (fileName, contents) => (createdFiles[fileName] = contents);

  // 准备并释放 d.ts 文件
  const program = ts.createProgram(fileNames, options, host);
  program.emit();

  // 在磁盘写入 d.ts 文件
  for (const fileName in createdFiles) {
    const content = createdFiles[fileName];

    // 路径替换
    const filePath = fileName.replace(/([\\/])src([\\/])/g, `$1${output}$2`);

    const fileDir = path.dirname(filePath);
    // 文件夹检查、创建
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }

    fs.writeFileSync(filePath, content);
  }
}

compileDTS();
compileDTS(false);
