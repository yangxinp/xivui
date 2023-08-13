# DatePicker 日期选择器

## 基础使用

选择单独一天，通过 `value` 或 `v-model:value` 属性绑定。

:::demo date-picker/basic

:::

## 选择范围

通过设置 `range` 属性为 `true`，可开启选择时间范围功能。

:::warning

绑定值类型为 `[string, string]`

:::

:::demo date-picker/range

:::

## 多选日期

通过设置 `multiple` 属性为 `true`，可开启多日期选择功能。选择复数日期时，面板上的时间会进行折叠。

:::warning

绑定值类型为 `string[]`

:::

:::demo date-picker/multiple

:::

## 布局调整

`rounded` 属性控制已选的日期范围样式是否为圆角；`desktop` 属性控制日期选中面板是否为简约风格；`landscape` 控制面板标题是否为垂直样式，仅在 `desktop: false` 下有效。

:::demo date-picker/layout

:::

## 范围限制

设置 `min`、`max` 属性可以限制日期的选择范围。

:::demo date-picker/limit

:::

## DatePicker API

### 属性

| 属性名    | 说明                                    | 类型         | 默认值  | 是否必填 |
| --------- | --------------------------------------- | ------------ | ------- | -------- |
| value     | 绑定值                                  | String/Array | -       | No       |
| max       | 可选范围的最早日期                      | String       | -       | No       |
| min       | 可选范围的最晚日期                      | String       | -       | No       |
| range     | 时间范围选择功能                        | Boolean      | `false` | No       |
| multiple  | 时间多选功能                            | Boolean      | `false` | No       |
| rounded   | 选中日期是否为圆角样式                  | Boolean      | `false` | No       |
| desktop   | 是否为桌面风格                          | Boolean      | `false` | No       |
| landscape | 是否为横版风格，在 `desktop` 属性下有效 | Boolean      | `false` | No       |
