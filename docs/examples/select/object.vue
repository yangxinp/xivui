<template>
  <div class="value">value: {{ value }}</div>

  <x-select v-model:value="value" label="Select" :options="options" object clearable />
  <x-select v-model:value="value" label="Select No-data" :options="[]" object clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Option {
  label: string
  value: string
}

const value = ref<Option>({ label: 'custom label', value: 'custom value' })

const options = ref([
  { label: 'option 1', value: 'A' },
  { label: 'option 2', value: 'B' },
  { label: 'option 3', value: 'C' },
  { label: 'option 4', value: 'D' },
  { label: 'option 5', value: 'E' },
  { label: 'option 6', value: 'F' },
])
</script>

<style scoped>
.value {
  font-weight: bold;
  padding-bottom: 16px;
}
</style>