<template>
  <x-switch v-model:value="value" />
  <x-switch v-model:value="value" inset />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(false)
</script>