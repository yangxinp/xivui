# Chip 纸片

## 基础用法

使用 `type` 属性来定义纸片的样式，可选属性有 `tonal`、`elevated`、`outlined`、`text`。

:::demo chip/basic

:::

## 图标搭配

:::demo chip/icon

:::

## 调节大小

:::demo chip/size

:::

## 禁用状态

:::demo chip/disabled

:::

## 按钮关闭

:::demo chip/closable

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
