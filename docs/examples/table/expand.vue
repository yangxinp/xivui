<template>
  <x-table :data="data">
    <x-table-column type="expand" align="center" width="60px">
      <template #default="source">
        <div>
          <div>Name: {{ source.name }}</div>
          <div>Age: {{ source.age }}</div>
          <div>Address: {{ source.address }}</div>
        </div>
      </template>
    </x-table-column>
    <x-table-column label="Name" prop="name" />
    <x-table-column label="Age" prop="age" />
    <x-table-column label="Address" prop="address" />
  </x-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
])

// { source, prop, data, column }
</script>

