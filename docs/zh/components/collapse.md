# Collapse 折叠面板

## 基础使用

`Collapse` 内部使用 `CollapsePanel` 进行面板声明。`Collapse` 的 `value` 能控制对应面板的显隐，与 `CollapsePanel` 定义的 `key` 属性进行匹配，如果 `key` 没有定义，默认为面板索引值。

:::demo collapse/basic

:::

## 多选模式

设置 `multiple` 属性即可启用多选。

:::demo collapse/multiple

:::

## 手风琴

设置 `accordion` 属性为 `true`，开启手风琴模式。

:::demo collapse/accordion

:::

## 自定义面板

标题通过 `title` 属性定义，也可以通过插槽 `header` 定义。

:::demo collapse/slot

:::

## 禁用

设置 `CollapsePanel` 的 `disabled` 可以禁用对应的面板，也可以设置 `Collapse` 的 `disabled` 属性对所有面板进行禁用。

:::demo collapse/disabled

:::

## 水波纹

设置 `ripple` 属性为 `true`，开启点击水波纹效果

:::demo collapse/ripple

:::

## 颜色

利用内置颜色类调色，详细跳转 [Color 颜色](./color.md#通用) 查看

:::demo collapse/color

:::

## Tabs API

## Collapse API

### 属性

| 属性名    | 说明     | 类型                | 默认值  | 是否必填 |
| --------- | -------- | ------------------- | ------- | -------- |
| value     | 绑定值   | String/Number/Array | -       | No       |
| accordion | 手风琴   | Boolean             | `false` | No       |
| multiple  | 多选     | Boolean             | `false` | No       |
| ripple    | 点击波纹 | Boolean             | `false` | No       |
| disabled  | 禁用     | Boolean             | `false` | No       |

## CollapsePanel API

### 属性

| 属性名   | 说明       | 类型          | 默认值  | 是否必填 |
| -------- | ---------- | ------------- | ------- | -------- |
| key      | 面板的标识 | String/Number | `index` | No       |
| title    | 面板标题   | String        | -       | No       |
| disabled | 禁用       | Boolean       | `false` | No       |

### 插槽

| 插槽名    | 说明       | 作用域参数 |
| --------- | ---------- | ---------- |
| `default` | 自定义内容 | -          |
| `header`  | 自定义标题 | -          |
