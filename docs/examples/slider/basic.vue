<template>
  <x-old-slider v-model:value="value1" />
  <x-slider v-model:value="value2" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(30)
const value2 = ref(30)
</script>