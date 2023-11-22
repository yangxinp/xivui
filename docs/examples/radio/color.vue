<template>
  <x-radio-group v-model:value="value" color="green">
    <x-radio value="1">Label 1</x-radio>
    <x-radio value="2">Label 2</x-radio>
    <x-radio value="3" color="purple">Label 3</x-radio>
    <x-radio value="4" color="orange-9">Label 4</x-radio>
  </x-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()
</script>