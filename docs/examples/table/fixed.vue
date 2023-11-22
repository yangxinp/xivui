<template>
  <x-table :data="data">
    <x-table-column label="Name" prop="name" min-width="120px" fixed />
    <x-table-column label="Sex" prop="sex" fixed />
    <x-table-column label="Age" prop="age" />
    <x-table-column label="Email" prop="email" min-width="200px" />
    <x-table-column label="Address" prop="address" min-width="250px" fixed="right" />
  </x-table>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  { name: 'Simon', age: 18, sex: 'man', email: 'example@mail.com', address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, sex: 'man', email: 'example@mail.com', address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, sex: 'man', email: 'example@mail.com', address: 'New York No. 1 Lake Park' },
])
</script>