<template>
  <div class="container">
    <x-date-picker v-model:value="value" multiple />
    <div class="value">Value: {{ value.join(',') || '-' }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['2020-10-07', '2020-10-15', '2020-10-23'])
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