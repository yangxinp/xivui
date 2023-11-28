<template>
  <x-old-slider v-model:value="value" range />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref([20, 50])
</script>

<style scoped>
.x-old-slider {
  margin-top: 20px;
}
</style>