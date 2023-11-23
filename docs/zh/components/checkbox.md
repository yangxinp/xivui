# Checkbox 复选框

## 基础使用

最简单的使用方式，单个 `x-checkbox`，设置属性 `checked` 来表示是否选中。

:::demo checkbox/basic

:::

## 复选框组

结合 `x-checkbox-group` 组件和子组件 `x-checkbox` 可以实现复选组，为 `x-checkbox-group` 绑定 `v-model:value`，再为每一个 `x-checkbox` 设置好对比的 `value` 属性即可，存在则相当于选中。另外，还可以通过 `change`、`input` 事件来响应变化，它会传入一个参数 `value` 来表示改变之后的值。如果选项简单，也可以设置 `options` 属性，接受一个数组，那么 `x-checkbox-group` 在内部会自动生成 `x-checkbox`。

:::demo checkbox/group

:::

## 横向排列

默认情况下，复选框组的复选框按竖直方向上排放。设置 `inline` 为 `true`，则按水平方向排放。

:::demo checkbox/group-inline

:::

## 颜色

通过属性 `color` 为复选框设置颜色，`Checkbox` 上的 `color` 优先级会高于 `CheckboxGroup` 上的。这样你可以单独为某个复选框赋予特色的颜色。

:::demo checkbox/color

:::

## 禁用状态

通过属性 `disabled` 为复选框设置禁用状态，`CheckboxGroup` 上的 `color` 优先级会高于 `Checkbox` 上的。

:::demo checkbox/disabled

:::

## 中间状态

`indeterminate` 属性用以表示 `checkbox` 的不确定状态，一般用于实现全选的效果。

:::demo checkbox/indeterminate

:::

## CheckboxGroup API

### 属性

| 属性名        | 说明                             | 类型    | 默认值 | 是否必填 |
| ------------- | -------------------------------- | ------- | ------ | -------- |
| value         | 用于设置当前选中的值             | Array   | -      | No       |
| color         | 复选框颜色                       | String  | -      | No       |
| inline        | 复选框横向排列                   | Boolean | false  | No       |
| disabled      | 是否禁用                         | Boolean | false  | No       |
| options       | 复选框选项，也可用 template 替代 | Array   | -      | No       |
| indeterminate | 设置不确定状态                   | Boolean | false  | No       |

## Checkbox API

### 属性

| 属性名   | 说明                                                                                        | 类型    | 默认值 | 是否必填 |
| -------- | ------------------------------------------------------------------------------------------- | ------- | ------ | -------- |
| color    | 复选框颜色，优先级高于[CheckboxGroup](./checkbox.md#checkboxgroup-api)                      | String  | `blue` | No       |
| checked  | 指定当前是否选中，在组件独立情况下工作                                                      | Boolean | false  | No       |
| disabled | 是否禁用                                                                                    | Boolean | false  | No       |
| value    | 根据 value 进行比较，判断是否选中，在[CheckboxGroup](./checkbox.md#checkboxgroup-api)下工作 | any     | -      | No       |

### 插槽

| 插槽名    | 说明               | 作用域参数 |
| --------- | ------------------ | ---------- |
| `default` | 设置复选框的 Label | -          |
