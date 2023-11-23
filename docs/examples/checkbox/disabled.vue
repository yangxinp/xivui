<template>
  <x-checkbox-group v-model:value="value1" disabled>
    <x-checkbox value="1">Label 1</x-checkbox>
    <x-checkbox value="2">Label 2</x-checkbox>
    <x-checkbox value="3">Label 3</x-checkbox>
  </x-checkbox-group>

  <x-checkbox-group v-model:value="value1">
    <x-checkbox value="1">Label 1</x-checkbox>
    <x-checkbox value="2" disabled>Label 2</x-checkbox>
    <x-checkbox value="3">Label 3</x-checkbox>
  </x-checkbox-group>

  <x-checkbox-group v-model:value="value2" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref()
const value2 = ref()

const options = [
  { label: 'Option A', value: 'A' },
  { label: 'Option B', value: 'B' },
  { label: 'Option C', value: 'C', disabled: true },
]
</script>

<style scoped>
.x-checkbox-group {
  margin-right: 24px;
}
</style>