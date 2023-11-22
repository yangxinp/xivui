# Radio 单选框

## 基础使用

最简单的使用方式，单个 `x-radio`，设置属性 `checked` 来表示是否选中。

:::demo radio/basic

:::

## 单选框组

结合 `x-radio-group` 组件和子组件 `x-radio` 可以实现单选组，为 `x-radio-group` 绑定 `v-model:value`，再为每一个 `x-radio` 设置好对比的 `value` 属性即可，相等则相当于选中。另外，还可以通过 `change`、`input` 事件来响应变化，它会传入一个参数 `value` 来表示改变之后的值。如果选项简单，也可以设置 `options` 属性，接受一个数组，那么 `x-radio-group` 在内部会自动生成 `x-radio`。

:::demo radio/group

:::

## 横向排列

默认情况下，单选框组的单选框按竖直方向上排放。设置 `inline` 为 `true`，则按水平方向排放。

:::demo radio/group-inline

:::

## 颜色

通过属性 `color` 为单选框设置颜色，`Radio` 上的 `color` 优先级会高于 `RaioGroup` 上的。这样你可以单独为某个单选框赋予特色的颜色。

:::demo radio/color

:::

## 禁用状态

通过属性 `disabled` 为单选框设置禁用状态，`RaioGroup` 上的 `color` 优先级会高于 `Radio` 上的。

:::demo radio/disabled

:::

## RadioGroup API

### 属性

| 属性名   | 说明                             | 类型    | 默认值 | 是否必填 |
| -------- | -------------------------------- | ------- | ------ | -------- |
| value    | 用于设置当前选中的值             | any     | -      | No       |
| color    | 单选框颜色                       | String  | -      | No       |
| inline   | 单选框横向排列                   | Boolean | false  | No       |
| disabled | 是否禁用                         | Boolean | false  | No       |
| options  | 单选框选项，也可用 template 替代 | Array   | -      | No       |

## Radio API

### 属性

| 属性名   | 说明                                                                           | 类型    | 默认值      | 是否必填 |
| -------- | ------------------------------------------------------------------------------ | ------- | ----------- | -------- |
| color    | 单选框颜色，优先级高于[RadioGroup](./radio.md#radiogroup-api)                      | String  | `blue` | No       |
| checked  | 指定当前是否选中，在组件独立情况下工作                                         | Boolean | false       | No       |
| disabled | 是否禁用                                                                       | Boolean | false       | No       |
| value    | 根据 value 进行比较，判断是否选中，在[RadioGroup](./radio.md#radiogroup-api)下工作 | any     | -           | No       |

### 插槽

| 插槽名    | 说明               | 作用域参数 |
| --------- | ------------------ | ---------- |
| `default` | 设置单选框的 Label | -          |
