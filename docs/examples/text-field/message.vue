<template>
  <x-text-field v-model:value="value" label="TextField"  error-message="This is error message" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>