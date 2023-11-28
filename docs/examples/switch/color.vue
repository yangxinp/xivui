<template>
  <div class="container">
    <x-switch v-model:value="value" class="text-blue" />
    <x-switch v-model:value="value" class="text-green" inset />
    <x-switch v-model:value="value" class="text-purple" loading />
    <x-switch v-model:value="value" class="text-teal" disabled />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(true)
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container .x-switch {
  margin-right: 8px;
}
</style>