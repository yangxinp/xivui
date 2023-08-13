# Slider 滑块

当前提供两种风格的滑块，一种是旧风格的组件 `<x-old-slider />`，而新版本的设计是 `<x-slider />`。

## 基础使用

通过 `value` 或 `v-model:value` 绑定数据，用户可点击滑块不释放进行左右滑动。

:::demo slider/basic

:::

## 范围选择

通过设置 `range` 属性为 `true`，可开启范围选择功能。

:::warning

绑定值类型为 `[number, number]`

:::

:::demo slider/range

:::

## 禁用状态

设置 `disabled` 属性为 `true`

:::demo slider/disabled

:::

## 范围限制

设置 `min`、`max` 属性可以滑块的选择范围。

:::demo slider/limit

:::

## 插槽使用

可以插槽 `thumb-label`，自定义滑块上的气泡。作用域会传入 `value` 当前值和 `type` 气泡的前后类型。

:::demo slider/slot

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

| 插槽名      | 说明           | 作用域参数      |
| ----------- | -------------- | --------------- |
| thumb-label | 气泡内容自定义 | `{ value, type }` |