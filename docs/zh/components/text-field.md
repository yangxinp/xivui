# TextField 输入框

## 基础使用

设置属性 `variant`，修改选择器风格。有 `underlined`、`outlined`、`filled` 三种风格，默认情况下为 `underlined`。设置属性 `label` 表示输入框相关信息。设置 `value` 属性，或绑定 `v-model:value` 来表示输入内容。

:::demo text-field/basic

:::

## 可清空

设置 `clearable` 属性，可开启一键清空内容功能。

:::demo text-field/clearable

:::

## 禁用状态

设置 `disabled` 属性，输入框进入不可编辑状态。

:::demo text-field/disabled

:::

## 加载状态

设置 `loading` 属性，输入框进入加载状态，表示正在执行一些操作。

:::demo text-field/loading

:::

## 图标

支持在输入框前后内外 —— 四个方位设置图标，为以下四个属性：前缀图标 `prefix-icon`、外部前缀图标 `prefix-outer-icon`、后缀图标 `suffix-icon`、外部后缀图标 `suffix-outer-icon`。

:::demo text-field/icon

:::

## 错误信息

在录入用户信息时，需要对信息进行校验并反馈用户，那么可以设置 `error-message` 属性，来存放信息，提醒用户。

:::demo text-field/message

:::

## TextField API

### 属性

| 属性名            | 说明                    | 类型                             | 默认值       | 是否必填 |
| ----------------- | ----------------------- | -------------------------------- | ------------ | -------- |
| value             | 绑定值                  | String/Number/Object/Array       | -            | No       |
| variant           | 样式类型                | `underlined`/`outlined`/`filled` | `underlined` | No       |
| type              | 类型（原生 input 类型） | -                                | `text`       | No       |
| label             | 标签                    | String                           | ''           | No       |
| placeholder       | 占位文字                | String                           | -            | No       |
| loading           | 是否加载中              | Boolean                          | false        | No       |
| clearable         | 是否可以清空内容        | Boolean                          | false        | No       |
| disabled          | 是否禁用                | Boolean                          | false        | No       |
| prefix-icon       | 前缀图标                | String                           | -            | No       |
| prefix-outer-icon | 外部前缀图标            | String                           | -            | No       |
| suffix-icon       | 后缀图标                | String                           | -            | No       |
| suffix-outer-icon | 外部后缀图标            | String                           | -            | No       |
| error-message     | 错误提示信息            | String                           | -            | No       |
