<template>
  <x-table :data="data">
    <x-table-column label="Name" prop="name">
      <template #header="column">
        <x-icon type="account-group"></x-icon>
        <span>{{ column.label }}</span>
      </template>
      <template #default="{ source }">
        <x-icon type="account"></x-icon>
        <span>{{ source.name }} √</span>
      </template>
    </x-table-column>
    <x-table-column label="Age" prop="age" />
    <x-table-column label="Address" prop="address" />
    <x-table-column label="Handle" align="center">
      <template #default>
        <x-button outlined>Delete</x-button>
      </template>
    </x-table-column>
  </x-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  { name: 'John Brown', age: 	32, address: 'New York No. 1 Lake Park' },
  { name: 'John Brown', age: 	32, address: 'New York No. 1 Lake Park' },
  { name: 'John Brown', age: 	32, address: 'New York No. 1 Lake Park' },
])

</script>