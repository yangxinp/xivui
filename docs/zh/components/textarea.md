# Textarea 文本域

## 基础使用

设置属性 `variant`，修改选择器风格。有 `underlined`、`outlined`、`filled` 三种风格。

:::demo textarea/basic

:::

## 清除内容

设置 `clearable` 属性，可开启一键清空内容功能。

:::demo textarea/clearable

:::

## 禁用状态

设置 `disabled` 属性，输入框进入不可编辑状态。

:::demo textarea/disabled

:::

## 加载状态

设置 `loading` 属性，表示输入框正在执行一些操作。

:::demo textarea/loading

:::

## 图标

支持在选择器前后内外-四个方位设置图标。

:::demo textarea/icon

:::

## 行数控制

通过设置属性 `rows` 来控制最小行数， `max-rows` 来控制最大行数。 

:::demo textarea/rows

:::

## 自动增长

通过设置属性 `auto-grow` 可使文本域的高度自适应其内容，也可搭配 `rows` 使用。

:::demo textarea/auto-grow

:::

## TextField API

### 属性

| 属性名            | 说明                   | 类型                             | 默认值       | 是否必填 |
| ----------------- | ---------------------- | -------------------------------- | ------------ | -------- |
| value             | 绑定值                 | String/Number/Object/Array       | -            | No       |
| variant           | 样式类型               | 'underlined'/'outlined'/'filled' | `underlined` | No       |
| label             | 标签                   | String                           | ''           | No       |
| placeholder       | 占位文字               | String                           | -            | No       |
| rows              | 行数                   | Number                           | 5            | No       |
| max-rows          | 最大行数               | Number                           | -            | No       |
| auto-grow         | 自适应行数             | Boolean                          | false        | No       |
| loading           | 是否加载中             | Boolean                          | false        | No       |
| clearable         | 是否可以清空内容       | Boolean                          | false        | No       |
| disabled          | 是否禁用               | Boolean                          | false        | No       |
| prefix-icon       | 前缀图标               | String                           | -            | No       |
| prefix-outer-icon | 外部前缀图标           | String                           | -            | No       |
| suffix-icon       | 后缀图标               | String                           | -            | No       |
| suffix-outer-icon | 外部后缀图标           | String                           | -            | No       |
| error             | 是否错误（待加强...📝） | Boolean                          | false        | No       |
| message           | 提示信息（待加强...📝） | String                           | -            | No       |
