<template>
  <div class="handler">
    <div class="item">
      <span>Fixed:</span>
      <x-switch v-model:value="fixed" />
    </div>

    <div class="item">
      <span>Hide:</span>
      <x-switch v-model:value="hide" />
    </div>
  </div>

  <x-table :data="data" max-height="300px" :hide-header="hide" :fixed-header="fixed">
    <x-table-column label="Name" prop="name" />
    <x-table-column label="Age" prop="age" />
    <x-table-column label="Address" prop="address" />
  </x-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fixed = ref(true)
const hide = ref(false)

const data = ref([
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
  { name: 'Simon', age: 18, address: 'New York No. 1 Lake Park' },
])
</script>

<style scoped>
.handler {
  display: flex;
  align-items: center;
}

.handler > .item {
  display: flex;
  align-items: center;
  margin-right: 16px;
}
</style>