# Slider 滑块

当前提供两种风格的滑块，以下介绍的是旧版本滑块，你也可以使用 [**新版滑块**](./slider.md)。

## 基础使用

通过 `value` 或 `v-model:value` 绑定数据，用户可点击滑块不释放进行左右滑动。

:::demo old-slider/basic

:::

## 范围选择

通过设置 `range` 属性为 `true`，可开启范围选择功能。

:::tip

绑定值类型为 `[number, number]`

:::

:::demo old-slider/range

:::

## 禁用状态

设置 `disabled` 属性为 `true`

:::demo old-slider/disabled

:::

## 范围限制

设置 `min`、`max` 属性可以滑块的选择范围，默认情况下 `min` 为 `0`，`max` 为 `100`

:::demo old-slider/limit

:::

## 插槽使用

可以插槽 `thumb-label`，自定义滑块上的气泡。作用域会传入 `value` 当前值和 `type` 气泡的前后类型。

:::demo old-slider/slot

:::

## 颜色

利用内置颜色类调色，详细跳转 [Color 颜色](./color.md#通用) 查看

:::demo old-slider/color

:::

## Slider API

### 属性

| 属性名   | 说明                     | 类型         | 默认值  | 是否必填 |
| -------- | ------------------------ | ------------ | ------- | -------- |
| value    | 绑定值                   | Number/Array | 0       | No       |
| min      | 可选范围的最小值         | Number       | 0       | No       |
| max      | 可选范围的最大值         | Number       | 100     | No       |
| range    | 开启范围选择（两个滑块） | String       | -       | No       |
| disabled | 禁用状态                 | Boolean      | `false` | No       |

### 插槽

| 插槽名      | 说明           | 作用域参数        |
| ----------- | -------------- | ----------------- |
| thumb-label | 气泡内容自定义 | `{ value, type }` |
