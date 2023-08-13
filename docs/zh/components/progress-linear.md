# ProgressLinear 进度条

## 基础使用

:::demo progress-linear/basic

:::

## 缓冲

设置缓冲值 `buffer-value`，默认值为 `100`。也就是底下半透明的条子😂

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

## ProgressLinear API

### 属性

| 属性名        | 说明               | 类型    | 默认值 | 是否必填 |
| ------------- | ------------------ | ------- | ------ | -------- |
| value         | 绑定值             | Number  | 0      | No       |
| bufferValue   | 缓冲值             | Number  | 100    | No       |
| stream        | 剩余的进度用流表示 | Boolean | false  | No       |
| indeterminate | 设置不确定进度状态 | Boolean | false  | No       |
