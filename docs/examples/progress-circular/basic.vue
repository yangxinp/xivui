<template>
  <x-progress-circular :value="value" />
  <x-progress-circular :value="value" :size="100" :width="10" />

  <x-button circle @click="value -= 10">-</x-button>
  <span>value: {{ value }}</span>
  <x-button circle @click="value += 10">+</x-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(50)
</script>