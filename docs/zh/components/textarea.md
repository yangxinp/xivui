# Textarea 文本域

## 基础使用

设置属性 `variant`，修改选择器风格。有 `underlined`、`outlined`、`filled` 三种风格，默认情况下为 `underlined`。设置属性 `label` 表示文本域相关信息。设置 `value` 属性，或绑定 `v-model:value` 来表示输入内容。

:::demo textarea/basic

:::

## 清除内容

设置 `clearable` 属性，可开启一键清空内容功能。

:::demo textarea/clearable

:::

## 禁用状态

设置 `disabled` 属性，文本域进入不可编辑状态。

:::demo textarea/disabled

:::

## 加载状态

设置 `loading` 属性，文本域进入加载状态，表示正在执行一些操作。

:::demo textarea/loading

:::

## 图标

支持在文本域前后内外 —— 四个方位设置图标，为以下四个属性：前缀图标 `prefix-icon`、外部前缀图标 `prefix-outer-icon`、后缀图标 `suffix-icon`、外部后缀图标 `suffix-outer-icon`。

:::demo textarea/icon

:::

## 行数控制

通过设置属性 `rows` 来控制最小行数， `max-rows` 来控制最大行数。

:::demo textarea/rows

:::

## 自动增长

通过设置属性 `auto-grow` 可使文本域的高度自适应其内容，也可搭配 `rows` 使用。还可以按住右下方箭头进行拖动，改变文本域高度。

:::demo textarea/auto-grow

:::

## 错误信息

在录入用户信息时，需要对信息进行校验并反馈用户，那么可以设置 `error-message` 属性，来存放信息，提醒用户。

:::demo textarea/message

:::


## TextField API

### 属性

| 属性名            | 说明                    | 类型                             | 默认值       | 是否必填 |
| ----------------- | ----------------------- | -------------------------------- | ------------ | -------- |
| value             | 绑定值                  | String/Number/Object/Array       | -            | No       |
| variant           | 样式类型                | `underlined`/`outlined`/`filled` | `underlined` | No       |
| label             | 标签                    | String                           | ''           | No       |
| placeholder       | 占位文字                | String                           | -            | No       |
| rows              | 行数                    | Number                           | 5            | No       |
| max-rows          | 最大行数                | Number                           | -            | No       |
| auto-grow         | 自适应行数              | Boolean                          | false        | No       |
| loading           | 是否加载中              | Boolean                          | false        | No       |
| clearable         | 是否可以清空内容        | Boolean                          | false        | No       |
| disabled          | 是否禁用                | Boolean                          | false        | No       |
| maxlength         | 文字数量限制            | number                           | -            | no       |
| prefix-icon       | 前缀图标                | String                           | -            | No       |
| prefix-outer-icon | 外部前缀图标            | String                           | -            | No       |
| suffix-icon       | 后缀图标                | String                           | -            | No       |
| suffix-outer-icon | 外部后缀图标            | String                           | -            | No       |
| error             | 是否错误（待加强...📝） | Boolean                          | false        | No       |
| message           | 提示信息（待加强...📝） | String                           | -            | No       |
