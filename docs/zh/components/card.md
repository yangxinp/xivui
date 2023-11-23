# Card 卡片

## 基础用法

设置 `title` 增加标题，设置 `subtitle` 增加副标题，设置 `content` 增加内容。如果设置普通字符串不能满足页面，可以使用插槽来替代上述的属性。

:::demo card/basic

:::

## 类型

使用 `type` 属性来定义卡片的样式，可选属性有 `elevated`、`tonal`、`outlined`、`flat`。默认情况下为 `elevated`。

:::demo card/type

:::

## 悬停浮起

设置 `hover` 属性为 `true`，鼠标悬停到卡片上时，卡片会悬浮。

:::demo card/hover

:::

## 卡片大小

提供三个快速调整宽度的属性 `width`、`minWidth`、`maxWidth`。

:::demo card/size

:::

## 媒体

将图片地址传入 `media` 属性，可在卡片顶部显示一些图片作为背景，以此突出卡片。在复杂情况下，可以使用 `slots.media` 插槽来自定义内容。

:::demo card/media

:::

## 展开收起

让你的卡片展示更加直观，当用户需要查看详情时，才展开卡片内容。设置 `expand` 属性 `false`，则进行内容收起，反之则展开。也可以搭配 `slots.footer` 插槽使用。

:::demo card/expand

:::

## Card API

### 属性

| 属性名   | 说明                                    | 类型                                 | 默认值     | 是否必填 |
| -------- | --------------------------------------- | ------------------------------------ | ---------- | -------- |
| type     | 纸片样式                                | `elevated`/`tonal`/`outlined`/`flat` | `elevated` | No       |
| width    | 卡片宽度                                | String/Number                        | -          | No       |
| minWidth | 卡片最小宽度                            | String/Number                        | -          | No       |
| maxWidth | 卡片最大宽度                            | String/Number                        | -          | No       |
| title    | 标题。可使用[插槽](./card#插槽)自定义   | String                               | -          | No       |
| subtitle | 副标题。可使用[插槽](./card#插槽)自定义 | String                               | -          | No       |
| content  | 内容。可使用[插槽](./card#插槽)自定义   | String                               | -          | No       |
| media    | 媒体内容。[插槽](./card#插槽)自定义     | String                               | -          | No       |
| hover    | 鼠标移过时可浮起                        | Boolean                              | -          | No       |
| expand   | 内容是否展开                            | Boolean                              | true       | No       |

### 插槽

| 插槽名     | 说明           | 作用域参数 |
| ---------- | -------------- | ---------- |
| `default`  | 自定义内容     | -          |
| `title`    | 自定义标题     | -          |
| `subtitle` | 自定义标题     | -          |
| `media`    | 自定义媒体内容 | -          |
| `header`   | 自定义头部内容 | -          |
| `footer`   | 自定义底部内容 | -          |
