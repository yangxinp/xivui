<template>
  <x-textarea v-model:value="value" label="Textarea" clearable />
  <x-textarea v-model:value="value" label="Textarea" variant="outlined" clearable />
  <x-textarea v-model:value="value" label="Textarea" variant="filled" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('click rear icon')
</script>