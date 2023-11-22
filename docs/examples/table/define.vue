<template>
  <x-table :data="data" :columns="columns">
    <template #header.name="column">
      <x-icon type="account-group"></x-icon>
      <span>{{ column.label }}</span>
    </template>
    <template #cell.name="{ source }">
      <x-icon type="account"></x-icon>
      <span>{{ source.name }} √</span>
    </template>
    <template #cell.handle="{ source }">
      <x-button outlined>Delete</x-button>
    </template>
  </x-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
])

const columns = ref([
  { label: 'Name', prop: 'name' },
  { label: 'Age', prop: 'age' },
  { label: 'Address', prop: 'address' },
  { label: 'Handle', prop: 'handle', align: 'center' }
])
</script>