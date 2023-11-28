# Started 快速开始

## 完整引用

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```ts
import { createApp } from 'vue';
import XiVui from 'xivui'
import App from './App.vue';
import 'xivui/dist/index.css';

const app = createApp(App);

app.use(XiVui.install).mount('#app')
```

:::warning

需要注意的是，样式文件需要单独引入。

:::

## 按需加载

按需加载可以有效的降低包的体积。

```html
<template>
  <Button color="blue">Blue Button</Button>
</template>

<script setup lang="ts">
  import { Button } from 'Xivui'
  import 'xivui/lib/components/button/style'
</script>
```

:::tip

为了书写方便，后期会单独编写 [unplugin](https://github.com/unjs/unplugin) 来完成[按需加载](./started.md#按需加载)的自动引入样式和 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 插件，用于单文件 `.vue` 的自动按需加载组件。

:::