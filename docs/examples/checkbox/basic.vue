<template>
  <x-checkbox v-model:value="checkbox">Text</x-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkbox = ref(false)
</script>