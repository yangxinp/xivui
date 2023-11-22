<template>
  <x-table :data="data">
    <x-table-column label="Name" prop="name" max-width="100px" />
    <x-table-column label="Age" prop="age" width="60px" />
    <x-table-column label="Email" prop="email" />
    <x-table-column label="Address" prop="address" min-width="150px" />
  </x-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  { name: 'Simon', age: 18, email: 'example@mail.com', address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, email: 'example@mail.com', address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, email: 'example@mail.com', address: 'New York No. 1 Lake Park' },
])
</script>