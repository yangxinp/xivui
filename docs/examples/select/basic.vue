<template>
  <div>value: {{ value }}</div>
  <br />
  <x-select v-model:value="value" label="Label1" :options="options" clearable />
  <x-select v-model:value="value" label="Label2" :options="options" variant="outlined" clearable />
  <x-select v-model:value="value" label="Label3" :options="options" variant="filled" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('22')

const options = ref([
  { label: 'AA', value: '11' },
  { label: 'BB', value: '22' },
  { label: 'CC', value: '33' },
  { label: 'DD', value: '44' },
  { label: 'EE', value: '55' },
  { label: 'FF', value: '66' },
])
</script>