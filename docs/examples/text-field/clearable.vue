<template>
  <x-text-field v-model:value="value" label="Underlined" clearable />
  <x-text-field v-model:value="value" label="Outlined" variant="outlined" clearable />
  <x-text-field v-model:value="value" label="Filled" variant="filled" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>