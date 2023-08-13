<template>
  <div>value: {{ value }}</div>
  <x-date-picker v-model:value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('2021-07-01')
</script>