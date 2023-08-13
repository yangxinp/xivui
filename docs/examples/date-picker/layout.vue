<template>
  <div>value: {{ value.join(',') || '-' }}</div>

  <x-switch v-model:value="landscape"></x-switch>Landscape 横版风格
  <x-switch v-model:value="rounded"></x-switch>Rounded 圆角
  <x-switch v-model:value="desktop"></x-switch>Desktop 桌面风格

  <x-date-picker
    v-model:value="value"
    range
    :landscape="landscape"
    :rounded="rounded"
    :desktop="desktop" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])
const landscape = ref(true)
const rounded = ref(true)
const desktop = ref(true)
</script>