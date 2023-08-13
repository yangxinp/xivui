# ProgressCircular 环状进度

## 基础使用

:::demo progress-circular/basic

:::

## 设置大小

在默认情况下，环的粗度和整体大小会根据字体大小调节。可以设置 `width`、`size` 进行调整固定。

:::demo progress-circular/size

:::


## 不确定状态

使用 `indeterminate` 属性会一直处于动画中。

:::demo progress-circular/indeterminate

:::

## ProgressCircular API

### 属性

| 属性名        | 说明                             | 类型    | 默认值 | 是否必填 |
| ------------- | -------------------------------- | ------- | ------ | -------- |
| value         | 绑定值                           | Number  | 0      | No       |
| width         | 环的粗度（默然根据字体大小调整） | Number  | -      | No       |
| size          | 环状整体大小                     | Number  | -      | No       |
| indeterminate | 设置不确定进度状态               | Boolean | false  | No       |
