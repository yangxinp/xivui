<template>
  <x-radio v-model:checked="checked">Label</x-radio>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>