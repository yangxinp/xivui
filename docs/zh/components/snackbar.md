# Snackbar 消息条

通常用来显示速递消息。它支持修改位置，移除延迟，以及调用回调函数。

## 基础使用

可以直接使用 `Snackbar` 组件绘制消息条。使用 `variant` 属性来定义消息条的样式，可选属性有 `elevated`、`tonal`、`outlined`。以及 `rounded` 属性来控制是否圆角。

:::tip

后面会解释 API 的命令式的使用

:::

:::demo snackbar/basic

:::

## 颜色

设置 `class` 或 `color` 属性改变颜色，参照 [Color 色彩](./color.md#通用) 的介绍

:::demo snackbar/color

:::

## 内容堆叠

`vertical` 属性可以扩展消息条的高度，适合多文本内容展示。

:::demo snackbar/vertical

:::

## 函数调用

一般消息都是在 JS 执行过程中产生，函数调用是最用普遍且便利的方法。使用 `options` 式组件声明可以通过上下文注入的 `this.$snackbar()` 执行。或者直接从组件库中引入 `import { SnackbarApi } from 'xivui'`

:::demo snackbar/function

:::

## 位置变更

通过设置 `placement` 属性为 `top`、`bottom`、`left-top`、`right-top`、`left-bottom`、`right-bottom`，可以让消息条从上方、下方、左上角、右上角、左下角、右下角弹出。

:::demo snackbar/placement

:::

## 关闭与延时

可以使用以下三种方式控制消息条的关闭

1. 传递参数 `close: true` 会才用默认的关闭按钮，用户可以操作进行点击来关闭消息
2. `callback({ close })` 使用回调传递进来的 `close` 进行关闭
3. `callback({ key })` 使用回调传递进来的 `key` 结合 `SnackbarApi.remove(key)` 进行关闭

自定义通知框自动关闭的延时，默认 4.5s，取消自动关闭只要将该值设为 0 即可。

:::demo snackbar/duration

:::

## 自定义内容

直接使用 `Snackbar` 组件，可以使用默认插槽。如果使用 `SnackbarApi` 调用，可以传递一个 **render** 函数给 `content` 属性。

:::demo snackbar/content

:::

## 自定义按钮

直接使用 `Snackbar` 组件，可以使用 `action` 插槽。如果使用 `SnackbarApi` 调用，可以传递一个 **render** 函数给 `close` 属性，或者设置 `close: true` 采用默认关闭按钮。

:::demo snackbar/close

:::

## Snacakbar Component

### 属性

| 属性名   | 说明                                    | 类型                           | 默认值    | 是否必填 |
| -------- | --------------------------------------- | ------------------------------ | --------- | -------- |
| variant  | 样式                                    | `elevation`/`tonal`/`outlined` | elevation | No       |
| color    | 颜色                                    | String                         | -         | No       |
| close    | 显示关闭按钮                            | Boolean                        | `false`   | No       |
| rounded  | 圆角                                    | Boolean                        | `false`   | No       |
| vertical | 内容堆叠                                | Boolean                        | `false`   | No       |
| duration | 显示持续时间，时间结束触发 `close` 事件 | Number                         | -         | No       |

### 插槽

| 插槽名    | 说明       | 作用域参数 |
| --------- | ---------- | ---------- |
| `default` | 自定义内容 | -          |
| `action`  | 自定义按钮 | -          |

## Snacakbar API

- `SnackbarApi.open(option)`
- `SnackbarApi.remove(key)`

参数继承大部分 [Snacakbar Component 属性](./snackbar.md#属性)

### 参数

| 属性名   | 说明                                   | 类型                                           | 默认值    | 是否必填 |
| -------- | -------------------------------------- | ---------------------------------------------- | --------- | -------- |
| content  | 显示持续时间（毫秒），时间结束自动关闭 | String/Number/ `() => VNode` Function          | -         | Yes      |
| close    | 显示关闭按钮                           | Boolean/ `(close: Function) => VNode` Function | `false`   | No       |
| variant  | 样式                                   | `elevation`/`tonal`/`outlined`                 | elevation | No       |
| color    | 颜色                                   | String                                         | -         | No       |
| rounded  | 圆角                                   | Boolean                                        | `false`   | No       |
| vertical | 内容堆叠                               | Boolean                                        | `false`   | No       |
| duration | 显示持续时间（毫秒），时间结束自动关闭 | Number                                         | 4500      | No       |
