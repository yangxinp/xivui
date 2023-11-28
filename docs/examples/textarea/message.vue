<template>
  <x-textarea v-model:value="value" label="Textarea"  error-message="This is error message" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>