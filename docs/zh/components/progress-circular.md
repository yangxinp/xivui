# ProgressCircular 环状进度

在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

## 基础使用

设置 `value` 属性，取值范围一般为 `0 ~ 100`，表示进度百分比。

:::demo progress-circular/basic

:::

## 设置大小

在默认情况下，环的粗度和整体大小会根据字体大小调节。可以设置 `width`、`size` 进行调整固定。`width` 表示圆的大小，而 `size` 表示弧的粗细，基于 `width` 计算。

:::demo progress-circular/size

:::

## 不确定状态

使用 `indeterminate` 属性会一直处于动画中。

:::demo progress-circular/indeterminate

:::

## 颜色

利用内置颜色类调色，详细跳转 [Color 颜色](./color.md#通用) 查看

:::demo progress-circular/color

:::

## ProgressCircular API

### 属性

| 属性名        | 说明                             | 类型    | 默认值 | 是否必填 |
| ------------- | -------------------------------- | ------- | ------ | -------- |
| value         | 绑定值                           | Number  | 0      | No       |
| width         | 环的粗度（默认根据字体大小调整） | Number  | -      | No       |
| size          | 环状整体大小                     | Number  | -      | No       |
| indeterminate | 设置不确定进度状态               | Boolean | false  | No       |
