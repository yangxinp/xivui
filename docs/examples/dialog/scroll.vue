<template>
  <div class="container">
    <x-button color="blue" @click="dialog = true">Open dialog</x-button>
  </div>

  <x-dialog
    v-model:value="dialog"
    title="Title"
    width="50%"
    persistent>
    <div class="content">
      <div v-for="num in 40">Longer content...</div>
    </div>
    <template #footer>
      <x-button color="green" @click="() => dialog = false">Confirm</x-button>
    </template>
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
  max-height: 300px;
  overflow: auto;
}
</style>