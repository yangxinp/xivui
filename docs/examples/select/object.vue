<template>
  <div>value: {{ value }}</div>
  <br />
  <x-select v-model:value="value" label="Label" :options="options" object clearable />
  <x-select v-model:value="value" label="No-data" :options="[]" object clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Option {
  label: string,
  value: string
}

const value = ref<Option>({ label: 'GG', value: '77' })

const options = ref([
  { label: 'AA', value: '11' },
  { label: 'BB', value: '22' },
  { label: 'CC', value: '33' },
  { label: 'DD', value: '44' },
  { label: 'EE', value: '55' },
  { label: 'FF', value: '66' },
])
</script>