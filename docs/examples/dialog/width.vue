<template>
  <div class="container">
    <x-button color="blue" @click="dialog = true">Open dialog</x-button>
  </div>

  <x-dialog v-model:value="dialog" title="Title" width="400px">
    <div class="content">This is content. Can place longer content.</div>
  </x-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false)
</script>

<style scoped>
.container {
  text-align: center;
}

.content {
  padding: 1rem;
}
</style>