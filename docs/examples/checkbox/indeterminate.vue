<template>
  <div style="margin-bottom: 12px;">
    <x-checkbox :checked="checkAll" :indeterminate="indeterminate" @change="onChange">All</x-checkbox>
  </div>
  
  <x-checkbox-group v-model:value="value"  :options="options" inline />
</template>

<script setup lang="ts">
import { UnwrapRef, ref, watch } from 'vue'

type Item = UnwrapRef<typeof options>[number]

const checkAll = ref(false)
const value = ref<Item['value'][]>([])
const indeterminate = ref(false)

const options = ref([
  { label: 'Option A', value: 'A' },
  { label: 'Option B', value: 'B' },
  { label: 'Option C', value: 'C' },
])

watch(() => value.value, (nv) => {
  if (nv.length === 0) {
    checkAll.value = false
    indeterminate.value = false
    return
  }
  if (nv.length === options.value.length) {
    checkAll.value = true
    indeterminate.value = false
    return
  }
  
  checkAll.value = false
  indeterminate.value = true
})

function onChange(checked: boolean) {
  if (checked) {
    value.value = options.value.map(opt => opt.value)
  } else {
    value.value = []
  }
}
</script>