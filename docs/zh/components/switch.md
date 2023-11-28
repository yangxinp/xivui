# Switch 开关

## 基础使用

设置 `value` 属性，或绑定 `v-model:value` 来表示所选值。如果 `inset` 为 `true` 则为嵌入模式。

:::demo switch/basic

:::

## 加载状态

设置 `disabled` 属性，开关进入不可编辑状态。

:::demo switch/loading

:::

## 禁用

设置 `loading` 属性，开关进入加载状态，表示正在执行一些操作。

:::demo switch/disabled

:::

## 颜色

利用内置颜色类调色，详细跳转 [Color 颜色](./color.md#通用) 查看

:::demo switch/color

:::

## Switch API

### 属性

| 属性名  | 说明       | 类型    | 默认值  | 是否必填 |
| ------- | ---------- | ------- | ------- | -------- |
| value   | 绑定值     | Boolean | `false` | No       |
| inset   | 嵌入模式   | Boolean | `false` | No       |
| loading | 是否加载中 | Boolean | `false` | No       |

### 事件

| 时间名       | 说明                       | 类型     |
| ------------ | -------------------------- | -------- |
| click        | 点击事件                   | Function |
| input        | 值改变事件                 | Function |
| update:value | 值改变事件 `v-model:value` | Function |
