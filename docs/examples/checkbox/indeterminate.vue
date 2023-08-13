<template>
  <x-checkbox v-model:value="checkbox" :indeterminate="indeterminate">Label</x-checkbox>
  <x-button @click="indeterminate = !indeterminate">Indeterminate</x-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkbox = ref(false)
const indeterminate = ref(false)
</script>