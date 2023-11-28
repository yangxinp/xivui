<template>
  <x-text-field v-model:value="value" label="TextField" clearable />
  <x-text-field v-model:value="value" label="TextField" variant="outlined" clearable />
  <x-text-field v-model:value="value" label="TextField" variant="filled" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('click rear icon')
</script>