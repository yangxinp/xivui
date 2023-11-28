<template>
  <x-text-field v-model:value="value" label="TextField" />
  <x-text-field v-model:value="value" label="TextField" variant="outlined" />
  <x-text-field v-model:value="value" label="TextField" variant="filled" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>