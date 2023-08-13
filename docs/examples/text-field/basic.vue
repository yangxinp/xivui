<template>
  <x-text-field v-model:value="value" label="Underlined" />
  <x-text-field v-model:value="value" variant="outlined" label="Outlined" />
  <x-text-field v-model:value="value" variant="filled" label="Filled" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>