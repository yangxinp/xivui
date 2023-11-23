<template>
  <x-checkbox v-model:checked="checked">Label</x-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>