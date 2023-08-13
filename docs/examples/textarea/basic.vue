<template>
  <x-textarea v-model:value="value" label="Underlined" />
  <x-textarea v-model:value="value" variant="outlined" label="Outlined" />
  <x-textarea v-model:value="value" variant="filled" label="Filled" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>