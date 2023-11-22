<template>
  <x-table :data="data" :loading="loading" @change="onChange">
    <x-table-column label="Name" prop="name" :sorter="sortName" />
    <x-table-column label="Age" prop="age" sorter/>
    <x-table-column label="Address" prop="address" sorter="remote"/>
  </x-table>
</template>

<script setup lang="ts">
import { ref, UnwrapRef } from 'vue';

const loading = ref(false)

const data = ref([
  { name: 'Arthur', age: 20, address: 'London, Park Lane no. 0' },
  { name: 'Simon', age: 18, address: 'London, Park Lane no. 1' },
  { name: 'Brandon', age: 19, address: 'London, Park Lane no. 2' },
])

type Item = UnwrapRef<typeof data>[number]

function sortName(a: Item, b: Item, prop: string) {
  return a.name.length - b.name.length
}

async function onChange(sorterVal: Set<any>, filterVal: Set<any>) {
  loading.value = true

  const ascend = [...sorterVal][0]?.order === 'ascend'

  await new Promise((resolve) => setTimeout(resolve, 1000))
  data.value = [
    { name: 'Arthur', age: 20, address: `London, Park Lane no. ${ascend ? 1 : 10}` },
    { name: 'Simon', age: 18, address: `London, Park Lane no. ${ascend ? 2 : 9}` },
    { name: 'Brandon', age: 19, address: `London, Park Lane no. ${ascend ? 3 : 8}` },
  ]

  loading.value = false
}
</script>