<template>
  <x-slider v-model:value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(30)
</script>