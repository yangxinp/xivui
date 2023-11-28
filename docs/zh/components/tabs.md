# Tabs 选项卡

## 基础使用

`Tabs` 组件提供了选项卡功能，`Tabs` 组件内部包含 `Tab` 单个标签组件。通过 `value` 属性或 `v-model:value` 来指定当前选中的标签页，接收的值是 `Tab` 组件上绑定的 `name` 属性，如果没有绑定则默认从 `1` 开始。

:::demo tabs/basic

:::

## 固定选项

设置属性 `fixed` 为 `true`，可固定选项，相当于水平空间由 `Tab` 标签完全填充固定

:::demo tabs/fixed

:::

## 禁用选项

对于某个选项禁用，通过在 `Tab` 组件上设置 `disabled` 属性为 `true`

:::demo tabs/disabled

:::

## 激活项居中

当选项过多，激活的选项可能不够醒目，可以设置属性 `centered` 为 `true`，让已激活的选项卡居中

:::demo tabs/centered

:::

## 显示方向键

当选项过多，想激活的选项远离可视范围，可以设置属性 `show-arrows` 为 `true`，在首尾两侧出现切换按钮，可快速定位相应选项的位置

:::demo tabs/show-arrows

:::

## 自定义选项

默认插槽提供三个参数，以支持更加多样的选项内容结构。依次是标识 `name`、是否激活 `active`、是否禁用 `disabled`。

:::demo tabs/custom

:::

## 颜色

利用内置颜色类调色，详细跳转 [Color 颜色](./color.md#通用) 查看

:::demo tabs/color

:::

## Tabs API

### 属性

| 属性名      | 说明             | 类型          | 默认值  | 是否必填 |
| ----------- | ---------------- | ------------- | ------- | -------- |
| value       | 绑定值           | String/Number | -       | No       |
| fixed       | 是否固定选项     | Boolean       | `false` | No       |
| fixed       | 是否固定选项     | Boolean       | `false` | No       |
| centered    | 激活项居中       | Boolean       | `false` | No       |
| show-arrows | 显示方向前后按钮 | Boolean       | `false` | No       |

## Tab API

### 属性

| 属性名 | 说明         | 类型          | 默认值 | 是否必填 |
| ------ | ------------ | ------------- | ------ | -------- |
| name   | 选项卡的标识 | String/Number | -      | No       |