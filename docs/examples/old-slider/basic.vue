<template>
  <x-old-slider v-model:value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(30)
</script>

<style scoped>
.x-old-slider {
  margin-top: 20px;
}
</style>