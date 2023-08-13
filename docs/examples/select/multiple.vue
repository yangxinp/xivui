<template>
  <div>value: {{ value }}</div>
  <br />
  <x-select v-model:value="value" label="Label1" :options="options" multiple />
  <x-select v-model:value="value" label="Label2" :options="options" variant="outlined" multiple />
  <x-select v-model:value="value" label="Label3" :options="options" variant="filled" multiple />
  <br />
  <x-select v-model:value="value" label="Label1" :options="options" multiple chips />
  <x-select v-model:value="value" label="Label2" :options="options" variant="outlined" multiple chips chips-collapse />
  <x-select v-model:value="value" label="Label3" :options="options" variant="filled" multiple chips chips-closable />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(['22', '55'])

const options = ref([
  { label: 'AA', value: '11' },
  { label: 'BB', value: '22' },
  { label: 'CC', value: '33' },
  { label: 'DD', value: '44' },
  { label: 'EE', value: '55' },
  { label: 'FF', value: '66' },
])
</script>