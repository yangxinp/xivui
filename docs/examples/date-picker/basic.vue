<template>
  <div class="container">
    <x-date-picker v-model:value="value" />
    <div class="value">Value: {{ value }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('2021-07-01')
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container .value {
  font-weight: bold;
}
</style>