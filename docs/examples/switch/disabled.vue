<template>
  <div class="container">
    <x-switch v-model:value="value" disabled />
    <x-switch v-model:value="value" inset disabled />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(false)
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