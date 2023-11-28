<template>
  <x-textarea v-model:value="value" label="Textarea" />
  <x-textarea v-model:value="value" label="Textarea" variant="outlined" />
  <x-textarea v-model:value="value" label="Textarea" variant="filled" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>