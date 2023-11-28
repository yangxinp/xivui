<template>
  <div class="container">
    <x-progress-circular :value="value" :size="100" :width="10" />

    <div class="handle">
      <x-button color="blue" circle :disabled="value <= 0" @click="value -= 10"
        >-</x-button
      >
      <span class="value">Value: {{ value }}</span>
      <x-button color="blue" circle :disabled="value >= 100" @click="value += 10"
        >+</x-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref(50);
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.handle {
  margin-left: 12px;
}

.handle .value {
  padding: 0 16px;
  font-weight: bold;
}
</style>
