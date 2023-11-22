# Table 表格

## 基础使用

基础的表格展示用法。当 `x-table` 元素中注入 `data` 对象数组后，在 `x-table-column` 中用 `prop` 属性来对应对象中的键名即可填入数据，用 `label` 属性来定义表格的列名。

:::demo table/basic

:::

## 带边框的表格

默认情况下，`Table` 组件是不具有竖直方向和外层边框的，如果需要，可以使用 `border` 属性，把该属性设置为 `true` 即可启用。

:::demo table/border

:::

## 流体高度

通过设置 `max-height` 属性为 `x-table` 指定最大高度。此时若表格所需的高度大于最大高度，则会显示一个滚动条。

:::demo table/height

:::

## 单元格省略

当内容超过当前的宽度，导致换行，想通过省略保持一行内容。可设置 `ellipsis` 可以让单元格内容根据宽度自动省略。

:::demo table/ellipsis

:::

## 排序

对某一列数据进行排序，在对应列中设置 `sorter` 为 `true` 布尔类型，即可开启本地自动排序。自动排序只支持数字类型排序，如果需要本地自定义排序，可以给 `sorter` 传入一个 `Function`，该函数接收三个参数，依次是 `prev`, `next`, `prop`。前两个参数相当于 `Array.sort` 函数的传入的，而 `prop` 是额外加入的。如果是需要远程服务器排序，可以将 `sorter` 设置为 `remote` 字符串类型，当排序条件改变时，会触发 `change` 事件，并接受列上的排序、筛选条件。

:::demo table/sort

:::

## 过滤

对某一列数据进行筛选，在对应列中设置 `filter` 为 `true` 布尔类型，即可开启本地自动过滤。筛选项在默认情况，是跟根据当前 `data` 计算出的不重复数据。如果需要自定义筛选项，需要设置 `filters` 为 `{ label: string, value: any }` 的数组类型。当然，与排序一样，也支持自定义过滤函数和远程过滤。给 `filter` 传入 `Function`，可根据自定义的逻辑进行过滤，该函数接受三个参数，依次是 `source` 行数据，`prop` 过滤列，`filters` 过滤值（数组类型）。如果是需要远程服务器排序，可以将 `filter` 设置为 `remote` 字符串类型，当过滤条件改变时，会触发 `change` 事件，并接受列上的排序、筛选条件。

:::demo table/filter

:::

## 加载中

设置 `loading` 为 `true`，可以显示加载动画。可以结合 [排序](./table.html#排序) 和 [过滤](./table.html#过滤) 使用。

:::demo table/loading

:::

## 自定义单元格内容

通过 `slots.default` 可自定义内容单元格的渲染。 通过 `slots.header` 可自定义表头单元格的渲染。

:::demo table/render

:::

::: info
如果列开启了 `type='expand'` [展开行](./table.html#展开行)功能，那么 `slots.default` 则是展开行的内容，如果想自定义触发按钮可以设置 `slots.expand`。
:::

## 固定表头和隐藏表头

默认情况下，如果内容高度超过了所设置的 `max-height`，表格的所有内容（包括表头）都会随着滚动而位移。这是故意为之，因为这能节省不必要的性能开支。如果需要表头滚动可以设置 `fixed-header` 为 `true`。如果不需要表头也可以去除，设置 `hide-header` 为 `true` 即可。

:::demo table/header

:::

## 固定列

固定列需要使用 `fixed` 属性，它接受 `Boolean` 值。 如果为 `true`, 列将被左侧固定。它还接受传入字符串，`left` 或 `right`，表示左边固定还是右边固定。

:::demo table/fixed

:::

## 列宽度

通过对设置 `width`、`min-width`、`max-width` 对列宽度进行控制，三个接受 `Boolean` 和 `Number` 类型的常数。`min-width` 默认为 `80px`。

::: warning

这几乎只在 `layout: fixed` 的布局下工作，因为 `layout: auto` 的模式是基于内容进行自动调整宽度，这与上述三者属性有一定程度的冲突。

:::

:::demo table/column

:::

## 展开行

通过设置列的 `type` 为 `expand`， 和 `slots.default` 插槽可以开启展开行功能，`slots.default` 模板会被渲染成为展开行的内容，模板可以接收一个 `source` 行数据。

:::demo table/expand

:::

## 布局

默认下 `layout="fixed"`，相当作用在 `table` 样式的 `table-layout: fixed`，该模式下可以通过 `width`、`min-width`、`max-width` 自定义调节各种[列宽度](./table.html#列宽度)。如果想让列宽根据内容自动适应，那么需要设置 `layout="auto"`，相当作用在 `table` 样式的 `table-layout: auto`。

:::demo table/layout

:::

## 变量声明式

可以不用上述 `template` 风格书写 `x-table-column`，通过设置 `columns` 变量来声明列。

:::demo table/define

:::

## Table API

### 属性

| 属性名      | 说明               | 类型           | 默认值  | 是否必填 |
| ----------- | ------------------ | -------------- | ------- | -------- |
| columns     | 表格列的配置描述   | Array          | -       | No       |
| data        | 显示的数据         | Array          | -       | No       |
| loading     | 页面是否加载中     | Boolean        | `false` | No       |
| border      | 是否带有纵向边框   | Boolean        | `false` | No       |
| dense       | 表格紧凑型         | Boolean        | `false` | No       |
| ellipsis    | 超过宽度将自动省略 | Boolean        | `false` | No       |
| maxHeight   | 表格最大高度       | String/Number  | `auto`  | No       |
| width       | 表格宽度           | String/Number  | `auto`  | No       |
| layout      | 布局模式           | `auto`/`fixed` | `fixed` | No       |
| hideHeader  | 隐藏表头           | Boolean        | `false` | No       |
| fixedHeader | 固定表头           | Boolean        | `false` | No       |

### 插槽

| 插槽名           | 说明                                   | 作用域参数                       |
| ---------------- | -------------------------------------- | -------------------------------- |
| `cell.${prop}`   | 自定义 `prop` 列的内容单元格           | `{ source, prop, data, column }` |
| `header.${prop}` | 自定义 `prop` 列的表头单元格           | `column`                         |
| `expand.${prop}` | 不推荐使用，自定义 `expand` 列的触发器 | `{ source, prop, data, column }` |

## Column API

### 属性

| 属性名   | 说明                                                                       | 类型                          | 默认值  | 是否必填 |
| -------- | -------------------------------------------------------------------------- | ----------------------------- | ------- | -------- |
| label    | 显示的标题                                                                 | String                        | -       | No       |
| prop     | 对应列的字段名                                                             | String                        | -       | No       |
| align    | 对应列的字段名                                                             | `left` / `center` / `right`   | -       | No       |
| width    | 对应列的宽度                                                               | String/Number                 | -       | No       |
| minWidth | 对应列的最小宽度                                                           | String/Number                 | `80px`  | No       |
| maxWidth | 对应列的最大宽度                                                           | String                        | -       | No       |
| ellipsis | 超过宽度将自动省略                                                         | Boolean                       | `false` | No       |
| fixed    | 列是否固定左侧或右侧，如果为 `true` 则为 `left`                            | `true` / `left` / `right`     | -       | No       |
| sorter   | 排序函数，提供 `Array.sort` 的参数函数，如需要服务端排序则设置为 `remote`  | Function / Boolean / `remote` | `false` | No       |
| filter   | 过滤函数，一个返回值为 `Boolean` 的函数，如需要服务端排序则设置为 `remote` | Function / Boolean / `remote` | `false` | No       |
| filters  | 筛选项，默认情况下会根据 `data` 生成，也可传入 `Array` 进行自定义          | Array / Boolean               | -       | No       |

### 插槽

| 插槽名    | 说明                                   | 作用域参数                       |
| --------- | -------------------------------------- | -------------------------------- |
| `default` | 自定义 `prop` 列的内容单元格           | `{ source, prop, data, column }` |
| `header`  | 自定义 `prop` 列的表头单元格           | `column`                         |
| `expand`  | 不推荐使用，自定义 `expand` 列的触发器 | `{ source, prop, data, column }` |
