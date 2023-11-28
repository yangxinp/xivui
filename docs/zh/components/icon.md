# Icon 图标

该组件库默认使用 Material Design 图标，但需要用户指定版本安装。你可以通过 [Material Design Icons](https://pictogrammers.com/library/mdi/icon) 来查看不同版本对应的图标。

## 安装

### 包管理工具

**建议您使用包管理器（如 NPM、Yarn 或 pnpm）安装**

```bash
# npm
npm install @mdi/font --save

# yarn
yarn add @mdi/font

# pnpm
pnpm install @mdi/font --save
```

:::tip

可以使用不同的类型的文件

```js
// css
import '@mdi/font/css/materialdesignicons.min.css'
// scss
import '@mdi/font/scss/materialdesignicons.scss'
```

:::

### 浏览器直接引入

根据不同的 CDN 提供商有不同的引入方式， 我们在这里以 [unpkg](https://unpkg.com/) 和 [jsDelivr](https://www.jsdelivr.com/) 举例。 你也可以使用其它的 CDN 供应商。

```html
<!-- unpkg -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@mdi/font/css/materialdesignicons.min.css"
/>

<!-- 或 -->

<!-- jsDelivr -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css"
/>
```

## 使用

将类型传入 `x-icon` 的 `type` 属性即可。更多图标名称请查看 [Material Design Icons](https://pictogrammers.com/library/mdi/icon)

:::demo icon/basic

:::

## Icon API

### 属性

| 属性名 | 说明     | 类型   | 默认值 | 是否必填 |
| ------ | -------- | ------ | ------ | -------- |
| type   | 图标类型 | String | -      | No       |