# Install 安装

由于 [Vue3](https://cn.vuejs.org/about/faq.html#what-browsers-does-vue-support) 不再支持 **IE11**，**XiVui** 也不再支持 **IE** 浏览器。

## 环境支持

| <img src="https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" /> IE / Edge | <img src="https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /> Firefox | <img src="https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /> Chrome | <img src="https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /> Safari | <img src="https://cdn.jsdelivr.net/npm/@browser-logos/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /> Opera | <img src="https://cdn.jsdelivr.net/npm/@browser-logos/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" /> Electron |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions


## 使用包管理器

**建议您使用包管理器（如 NPM、Yarn 或 pnpm）安装**

```bash
# npm
$ npm install xivui --save

# yarn
$ yarn add xivui

# pnpm
$ pnpm install xivui --save
```


## 浏览器直接引入

根据不同的 CDN 提供商有不同的引入方式， 我们在这里以 [unpkg](https://unpkg.com/) 和 [jsDelivr](https://www.jsdelivr.com/) 举例。 你也可以使用其它的 CDN 供应商。

### unpkg

```html
<head>
  <!-- Import style -->
  <link rel="stylesheet" href="https://unpkg.com/xivui/dist/index.css" />
  <!-- Import Vue 3 -->
  <script src="https://unpkg.com/vue@3"></script>
  <!-- Import component library -->
  <script src="https://unpkg.com/xivui/index.js"></script>
</head>
```

### jsDelivr

```html
<head>
  <!-- Import style -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xivui/dist/index.css" />
  <!-- Import Vue 3 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
  <!-- Import component library -->
  <script src="https://cdn.jsdelivr.net/npm/xivui/index.js"></script>
</head>
```

:::tip

你可能还需单独安装 `@mdi/font`，获得图标功能支持。详见 [Icon 图标](./icon.md)

:::