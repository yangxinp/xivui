<template>
  <x-old-slider v-model:value="value" range disabled />
</template>
 
<script setup lang="ts">
import { ref } from 'vue';

const value = ref([20, 50])
</script>