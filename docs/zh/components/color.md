# Color 色彩

使用 [Material](https://m2.material.io/design/color/the-color-system.html) 的色彩体系。你可以利用 `class` 来声明颜色，背景颜色直接使用颜色名称 `${color}` 即可，而字体颜色需要额外加上前缀 ``text-${color}``。

:::demo color/basic

:::

## 通用

部分组件由提供 `color` 属性来改变颜色，如果没有 `color` 属性也不用担心，可以直接利用上述方式修改颜色，甚至与原本组件上的 `color` 属性效果一致。

:::demo color/common

:::

## 调色板

以下使内置的颜色变量，结合变量名和上方使用方法快速更换颜色。

<ExhibitColor />