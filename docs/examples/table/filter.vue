<template>
  <x-table :data="data" :loading="loading" @change="onChange">
    <x-table-column label="Name" prop="name" :filters="nameFilters" :filter="sortName" />
    <x-table-column label="Sex" prop="sex" filter />
    <x-table-column label="Address" prop="address" :filters="cityFilters" filter="remote" />
  </x-table>
</template>

<script setup lang="ts">
import { ref, UnwrapRef } from 'vue';

const loading = ref(false)

const data = ref([
  { name: 'Arthur', sex: 'man', address: 'Zhenzhou' },
  { name: 'Simon', sex: 'female', address: 'Shenzhen' },
  { name: 'Brandon', sex: 'man', address: 'Liangshan' },
])

const nameFilters = ref([
  { label: 'A..', value: 'a' },
  { label: 'B..', value: 'b' },
  { label: 'S..', value: 's' },
])

const cityFilters = ref([
  { label: 'a Tier-1 city', value: 1 },
  { label: 'a Tier-2 city', value: 2 },
  { label: 'a Tier-3 city', value: 3 },
])

type Item = UnwrapRef<typeof data>[number]
type NameOption = UnwrapRef<typeof nameFilters>[number]
type CityOption = UnwrapRef<typeof cityFilters>[number]

function sortName(source: Item, prop: string, options: NameOption[]) {
  const value = source.name.toLowerCase()
  return options.some((opt) => value.startsWith(opt.value.toLowerCase()))
}

async function onChange(sorterVal: Set<any>, filterVal: Set<any>) {
  loading.value = true
  
  const filters: CityOption[] = [...filterVal].find(item => item.prop === 'address')?.filterVal ?? []

  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 简单的筛选项添加到后面，一般是调接口替换数据，作为演示这里简单处理
  if (filters.length) {
    const append = filters.map(item => item.label).join(' - ')
    data.value = [
      { name: 'Arthur', sex: 'man', address: 'Zhenzhou' + append },
      { name: 'Simon', sex: 'female', address: 'Shenzhen' + append },
      { name: 'Brandon', sex: 'man', address: 'Liangshan' + append },
    ]
  } else {
    data.value = [
      { name: 'Arthur', sex: 'man', address: 'Zhenzhou' },
      { name: 'Simon', sex: 'female', address: 'Shenzhen' },
      { name: 'Brandon', sex: 'man', address: 'Liangshan' },
    ]
  }

  loading.value = false
}
</script>