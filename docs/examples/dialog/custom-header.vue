<template>
  <div class="container">
    <x-button color="blue" @click="dialog = true">Open dialog</x-button>
  </div>

  <x-dialog v-model:value="dialog" title="Title">
    <template #header>
      <div class="header">
        <x-icon type="emoticon"/>
        <span>Custom title</span>
      </div>
    </template>
    <div class="content">This is content</div>
  </x-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false)
</script>

<style scoped>
.container {
  text-align: center;
}

.header {
  padding: 16px 24px 10px;
  font-size: 32px;
}

.content {
  padding: 1rem;
}
</style>