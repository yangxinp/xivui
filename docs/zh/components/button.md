# Button 按钮

## 基础用法

使用 `rounded`、`outlined`、`circle`、`text`、`outlined` 属性来定义按钮的样式，部分可以自由组合。

:::demo button/basic

:::

## 调节大小

使用 `x-small`、`small`、`large`、`x-large` 属性来定义按钮的大小。

:::demo button/size

:::

## 加载状态

设置 `loading` 属性为 `true` 来显示加载中状态。

:::demo button/loading

:::

## 禁用状态

设置 `disabled` 属性为 `true` 来表示禁用状态。

:::demo button/disabled

:::

## 图标按钮

在使用 [Icon](./icon.md) 插入相应位置，并且内容使用标签包裹起来，以获得区分。如果时纯文本可以使用 `span` 包裹。

:::demo button/icon

:::

## 颜色

给 `color` 属性设置一个内置的颜色名称。

:::demo button/color

:::

## Button API

### 属性

| 属性名   | 说明           | 类型    | 默认值   | 是否必填 |
| -------- | -------------- | ------- | -------- | -------- |
| tag      | 自定义元素标签 | String  | `button` | No       |
| rounded  | 是否为圆角按钮 | Boolean | `false`  | No       |
| circle   | 是否为圆形按钮 | Boolean | `false`  | No       |
| text     | 是否为文字按钮 | Boolean | `false`  | No       |
| outlined | 是否为镂空按钮 | Boolean | `false`  | No       |
| disabled | 是否禁用       | Boolean | `false`  | No       |
| loading  | 加载中状态     | Boolean | `false`  | No       |
| block    | 按钮撑开       | Boolean | `false`  | No       |
| x-small  | 超小号按钮     | Boolean | `false`  | No       |
| small    | 小号按钮       | Boolean | `false`  | No       |
| large    | 大号按钮       | Boolean | `false`  | No       |
| x-large  | 超大号按钮     | Boolean | `false`  | No       |
