<template>
  <x-progress-linear :value="20" />
  <br />
  <x-progress-linear :value="process" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const process = ref(0)
const _timer = ref<number>()

onMounted(() => {
  _timer.value = window.setInterval(() => {
    process.value = process.value + 10 > 100 ? 0 : process.value + 10
  }, 1500)
})

onUnmounted(() => {
  if (_timer.value) {
    window.clearInterval(_timer.value)
    _timer.value = undefined
  }
})
</script>