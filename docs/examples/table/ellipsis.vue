<template>
  <x-table :data="data">
    <x-table-column label="Name" prop="name" />
    <x-table-column label="Age" prop="age" />
    <x-table-column label="Address" prop="address" ellipsis />
  </x-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  { name: 'Simon', age: 18, address: 'Shenzhen City Guangdong Province China' },
  { name: 'Simon', age: 18, address: 'Shenzhen City Guangdong Province China' },
  { name: 'Simon', age: 18, address: 'Shenzhen City Guangdong Province China' },
])
</script>