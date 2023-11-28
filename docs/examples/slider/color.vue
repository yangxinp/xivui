<template>
  <x-slider v-model:value="value" class="text-blue" />
  <x-slider v-model:value="value" class="text-green" />
  <x-slider v-model:value="value" class="text-red" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(30)
</script>