<template>
  <x-old-slider v-model:value="value" class="text-blue" />
  <x-old-slider v-model:value="value" class="text-green" />
  <x-old-slider v-model:value="value" class="text-red" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(30)
</script>

<style scoped>
.x-old-slider {
  margin-top: 25px;
}
</style>