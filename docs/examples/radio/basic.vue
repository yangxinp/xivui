<template>
  <x-radio :value="value" />
  <x-radio :value="value" color="text-green" />
  <x-radio :value="value" color="text-purple" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
</script>