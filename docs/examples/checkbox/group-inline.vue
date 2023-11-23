<template>
  <x-checkbox-group v-model:value="value" inline>
    <x-checkbox value="1">Label 1</x-checkbox>
    <x-checkbox value="2">Label 2</x-checkbox>
    <x-checkbox value="3">Label 3</x-checkbox>
  </x-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
</script>