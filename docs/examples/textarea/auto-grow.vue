<template>
  <x-textarea
    v-model:value="value"
    label="Underlined"
    :rows="2"
    placeholder="Two rows and auto-grow"
    auto-grow />
  <x-textarea
    v-model:value="value"
    variant="outlined"
    label="Outlined"
    :rows="3"
    placeholder="Thress rows and auto-grow"
    auto-grow />
  <x-textarea
    v-model:value="value"
    variant="filled"
    label="Filled"
    :rows="2"
    placeholder="Four rows and auto-grow"
    auto-grow />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>