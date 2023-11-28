# ProgressLinear 进度条

在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

## 基础使用

设置 `value` 属性，取值范围一般为 `0 ~ 100`，表示进度百分比。

:::demo progress-linear/basic

:::

## 缓冲

设置缓冲值 `buffer-value`，默认值为 `100`。也就是底下半透明的条子 😂

:::demo progress-linear/buffter

:::

## 流

设置流 `stream` 来标识当前还有预加载的内容

:::demo progress-linear/stream

:::

## 不确定状态

使用 `indeterminate` 属性会一直处于动画中。

:::demo progress-linear/indeterminate

:::

## 粗细控制

对于进度条的粗细程度能够用 `height` 进行控制，默认为 `4px`

:::demo progress-linear/height

:::

## 颜色

利用内置颜色类调色，详细跳转 [Color 颜色](./color.md#通用) 查看

:::demo progress-linear/color

:::

## ProgressLinear API

### 属性

| 属性名        | 说明               | 类型          | 默认值 | 是否必填 |
| ------------- | ------------------ | ------------- | ------ | -------- |
| value         | 绑定值             | Number        | 0      | No       |
| height        | 高度               | Number/String | -      | No       |
| bufferValue   | 缓冲值             | Number        | 100    | No       |
| stream        | 剩余的进度用流表示 | Boolean       | false  | No       |
| indeterminate | 设置不确定进度状态 | Boolean       | false  | No       |
