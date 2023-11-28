<template>
  <x-old-slider v-model:value="value" range :min="-50" :max="50" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref([-20, 20])
</script>

<style scoped>
.x-old-slider {
  margin-top: 20px;
}
</style>