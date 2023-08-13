<template>
  <div>value: {{ value.join(' ~ ') || '-' }}</div>
  <x-date-picker v-model:value="value" range />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])
</script>