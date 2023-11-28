# Chip 纸片

## 基础用法

使用 `type` 属性来定义纸片的样式，可选属性有 `tonal`、`elevated`、`outlined`、`text`。

:::demo chip/basic

:::

## 图标搭配

设置属性 `prepend-icon` 前缀图标类型，设置属性 `append-icon` 后缀图标类型，图标类型详情见 [Icon](./icon.md) 说明。


:::demo chip/icon

:::

## 按钮关闭

设置属性 `closable` 为 `true`，使后方出现关闭按钮，同时还需监听 `close` 事件。

:::demo chip/closable

:::

## 颜色

使用 `class` 样式改变颜色，参照 [Color 色彩](./color.md#通用) 的介绍

:::demo chip/color

:::

## Chip API

### 属性

| 属性名      | 说明       | 类型                                 | 默认值  | 是否必填 |
| ----------- | ---------- | ------------------------------------ | ------- | -------- |
| type        | 纸片样式   | `tonal`/`elevated`/`outlined`/`text` | `tonal` | No       |
| prependIcon | 前缀图标   | String                               | -       | No       |
| appendIcon  | 后缀图标   | String                               | -       | No       |
| disabled    | 是否禁用   | Boolean                              | `false` | No       |
| closable    | 是否可关闭 | Boolean                              | `false` | No       |
