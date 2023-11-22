<template>
  <x-table :data="data" :loading="loading">
    <x-table-column label="Name" prop="name" />
    <x-table-column label="Age" prop="age" />
    <x-table-column label="Address" prop="address" />
  </x-table>

  <x-button outlined class="add-btn" @click="handleReset">Reset</x-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(false)

const data = ref([
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
])

async function handleReset() {
  loading.value = true
  data.value = []

  await new Promise((resolve) => setTimeout(resolve, 1000))

  data.value = [
    { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
    { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
    { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  ]

  loading.value = false
}
</script>

<style scoped>
.add-btn {
  width: 100%;
  margin: 20px 0;
}
</style>