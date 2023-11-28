<template>
  <div class="container">
    <x-button color="blue" @click="baseDialog = true">Basic dialog</x-button>
    <x-button color="blue-7" @click="titleDialog = true">Title dialog</x-button>
  </div>

  <x-dialog v-model:value="baseDialog">
    <div class="content">This is content</div>
  </x-dialog>
  <x-dialog v-model:value="titleDialog" title="Title">
    <div class="content">This is content</div>
  </x-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const baseDialog = ref(false)
const titleDialog = ref(false)
</script>

<style scoped>
.container {
  text-align: center;
}

.content {
  max-width: 400px;
  padding: 1rem;
}
</style>