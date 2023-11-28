# Dialog 对话框

## 基础使用

设置 `value` 属性，或绑定 `v-model:value`，来控制显示隐藏，值为 `Boolean` 类型。使用 `slots.default` 默认插槽可以设置内容，而 `title` 属性可快速设置标题。

:::demo dialog/basic

:::

## 宽度控制

默认情况下对话框的宽度是根据默认插槽内容动态调节的，可以对默认插槽进行控制，也可通过设置 `width` 调节宽度

:::demo dialog/width

:::

## 遮罩

默认情况下，对话框存在灰蒙蒙的遮罩，如果要关闭可以设置 `modal` 为 `false`

:::demo dialog/modal

:::

## 自定义头部

如果想更加定制化对话框的标题或者头部，可以使用 `slots.header` 插槽

:::demo dialog/custom-header

:::

## 自定义页脚

对话框一般涉及人机交互，需要放置按钮，那么可以使用 `slots.footer` 插槽

:::demo dialog/custom-footer

:::

## 手动关闭

默认情况下点击遮罩层或者按下 `ESC` 按键，就会触发关闭对话框事件。如果是 `v-model:value` 进行绑定，那值会进行更新。如果不想用户误操作，可以设置 `persistent` 为 `true`。这样在点击遮罩层或按 `ESC`，就不会关闭对话框，同时还会由提示动画效果。

:::demo dialog/persistent

:::

## 内容过长

当内容过多可以设置自定义内容的样式 `overflow: auto`，该组件会进行适配，只允许内部滚动，禁止页面滚动。

:::demo dialog/scroll

:::

## Dialog API

### 属性

| 属性名     | 说明                        | 类型    | 默认值  | 是否必填 |
| ---------- | --------------------------- | ------- | ------- | -------- |
| value      | 是否显示                    | Boolean | `false` | No       |
| title      | 标题                        | Boolean | `false` | No       |
| modal      | 显示遮罩                    | Boolean | `false` | No       |
| width      | 对话框的最大宽度            | String  | -       | No       |
| persistent | 点击外部和按下 esc 不会关闭 | Boolean | `false` | No       |

### 插槽

| 插槽名  | 说明                               | 作用域参数 |
| ------- | ---------------------------------- | ---------- |
| default | 自定义内容                         | -          |
| header  | 自定义标题                         | -          |
| footer  | 自定义对话框底部，通常用于放置按钮 | -          |
