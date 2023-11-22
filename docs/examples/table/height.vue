<template>
  <x-table :data="data" fixed-header max-height="300px">
    <x-table-column label="Name" prop="name" />
    <x-table-column label="Age" prop="age" />
    <x-table-column label="Address" prop="address" />
  </x-table>

  <x-button outlined class="add-btn" @click="handleAdd">Add item</x-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
])

function handleAdd () {
  data.value.push({ name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' })
}

</script>

<style scoped>
.add-btn {
  width: 100%;
  margin: 20px 0;
}
</style>