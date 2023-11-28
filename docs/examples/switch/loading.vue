<template>
  <div class="container">
    <x-switch v-model:value="value" loading />
    <x-switch v-model:value="value" inset loading />
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