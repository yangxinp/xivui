<template>
  <x-progress-linear :value="20" :buffer-value="40" stream />
  <br />
  <x-progress-linear :value="process" :buffer-value="buffer" stream />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const process = ref(0)
const buffer = ref(0)
const _timer = ref<number>()

function start () {
  _timer.value = window.setInterval(() => {
    let _process, _buffer

    if (process.value === 100) {
      _process = 0
      _buffer = 0
    } else {
      _process = Math.min(process.value + (Math.random() * 10), 100)
      _buffer = Math.min(buffer.value + Math.random() * 15, 100)
    }

    process.value = _process
    buffer.value = _buffer
  }, 1500)
}

function stop() {
  if (_timer.value) {
    clearInterval(_timer.value)
    _timer.value = undefined
  }
}

onMounted(() => start())
onUnmounted(() => stop())
</script>