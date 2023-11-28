<template>
  <x-textarea
    v-model:value="value"
    label="Textarea"
    :rows="2"
    placeholder="Two rows and auto-grow"
    auto-grow />
  <x-textarea
    v-model:value="value"
    label="Textarea"
    variant="outlined"
    :rows="3"
    placeholder="Thress rows and auto-grow"
    auto-grow />
  <x-textarea
    v-model:value="value"
    label="Textarea"
    variant="filled"
    :rows="2"
    placeholder="Four rows and auto-grow"
    auto-grow />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>