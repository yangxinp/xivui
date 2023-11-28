<template>
  <x-old-slider v-model:value="value1" >
    <template #thumb-label="{ value, type }">
      <span>{{ type.slice(0, 1) }}:{{ value }}</span>
    </template>
  </x-old-slider>
  <x-old-slider v-model:value="value2" range>
    <template #thumb-label="{ value, type }">
      <span>{{ type.slice(0, 1) }}:{{ value }}</span>
    </template>
  </x-old-slider>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(20)
const value2 = ref([20, 50])
</script>

<style scoped>
.x-old-slider {
  margin-top: 25px;
}
</style>