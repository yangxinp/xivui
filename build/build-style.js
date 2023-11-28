const fs = require("fs");

function compileColor() {
  const data = fs.readFileSync("./src/styles/tools/_color.scss");
  const fragment = data.toString("utf-8").split("\n");

  let content = `@use "./tools/color";\n@use "./tools/mixin";\n\n`;
  let json = ''

  for (const chunk of fragment) {
    if (chunk === "") {
      content += "\n";
      continue;
    }

    const match = chunk.match(/^\$(.+(?:-\d+)?):\s*(.+);\s*$/);
    if (match === null) continue;

    const name = match[1];
    const variable = match[2];

    json += `  ["${name}", "${variable}"],\n`;
    content += `@include mixin.color("${name}", color.$${name});\n`;
  }

  if (json) json = json.slice(0, -2);

  fs.writeFileSync("./docs/.vitepress/data/color.json", `[\n${json}\n]`);
  fs.writeFileSync("./src/styles/_color.scss", content);
}

function compileElevation() {
  const data = fs.readFileSync("./src/styles/tools/_elevation.scss");
  const fragment = data.toString("utf-8").split("\n");

  let content = `@use "./tools/mixin";\n@use "./tools/elevation" as e;\n\n`;
  let map = {};

  for (const chunk of fragment) {
    if (chunk === "") continue;

    const match = chunk.match(/^\$\w+-(\d+):/);
    if (match === null) continue;

    const num = match[1];
    const variableName = "e." + match[0].slice(0, -1);

    if (!map[num]) map[num] = [];
    map[num].push(variableName);
  }

  for (const num in map) {
    const args = map[num].join(", ");
    content += `@include mixin.elevation(${num}, ${args});\n`;
  }

  fs.writeFileSync("./src/styles/_elevation.scss", content);
}

compileColor();
compileElevation();
