<template>
  <div class="container">
    <div class="handle">
      <x-checkbox v-model:checked="landscape" :disabled="desktop">Landscape 横版风格</x-checkbox>
      <x-checkbox v-model:checked="rounded">Rounded 圆角</x-checkbox>
      <x-checkbox v-model:checked="desktop">Desktop 桌面风格</x-checkbox>
    </div>

    <x-date-picker
      v-model:value="value"
      range
      :landscape="landscape"
      :rounded="rounded"
      :desktop="desktop" />

    <div class="value">value: {{ value.join(',') || '-' }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['2020-10-15', '2020-11-18'])

const landscape = ref(true)
const rounded = ref(true)
const desktop = ref(true)
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container .handle .x-checkbox {
  margin-right: 8px;
  margin-bottom: 8px;
}

.container .value {
  font-weight: bold;
}
</style>