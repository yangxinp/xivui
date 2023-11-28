<template>
  <x-select
    v-model:value="value"
    label="Select"
    :options="options"
    multiple
  />
  <x-select
    v-model:value="value"
    label="Select"
    :options="options"
    variant="outlined"
    multiple
  />
  <x-select
    v-model:value="value"
    label="Select"
    :options="options"
    variant="filled"
    multiple
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(['A', 'B'])

const options = ref([
  { label: 'option 1', value: 'A' },
  { label: 'option 2', value: 'B' },
  { label: 'option 3', value: 'C' },
  { label: 'option 4', value: 'D' },
  { label: 'option 5', value: 'E' },
  { label: 'option 6', value: 'F' },
])
</script>