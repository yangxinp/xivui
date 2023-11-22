<template>
  <x-radio-group v-model:value="value1" @change="onChange">
    <x-radio value="1">Label 1</x-radio>
    <x-radio value="2">Label 2</x-radio>
    <x-radio value="3">Label 3</x-radio>
  </x-radio-group>

  <x-radio-group v-model:value="value2" :options="options" @change="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref()
const value2 = ref()

const options = [
  { label: 'Option A', value: 'A' },
  { label: 'Option B', value: 'B' },
  { label: 'Option C', value: 'C' },
]

const onChange = (value: any) => console.log(value)
</script>

<style scoped>
.x-radio-group {
  margin-right: 24px;
}
</style>