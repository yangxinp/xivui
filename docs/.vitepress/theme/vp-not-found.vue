<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

function goHome() {
  window.location.href = withBase('/')
}

</script>

<template>
  <div class="NotFound">
    <p class="code">404</p>
    <h1 class="title">该页面不存在</h1>
    <div class="divider" />
    <blockquote class="quote">
      如果你没有改变路径，或一直在查看文档。那么有可能是资源更换了地址，请尝试回到首页！
    </blockquote>

    <div class="action">
      <x-button @click="goHome">
        <x-icon type="home" />
        <span>Home</span>
      </x-button>
    </div>
  </div>
</template>

<style scoped>
.NotFound {
  padding: 64px 24px 96px;
  text-align: center;
}

@media (min-width: 768px) {
  .NotFound {
    padding: 96px 32px 168px;
  }
}

.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
}

.title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 256px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.action {
  padding-top: 20px;
}
</style>
