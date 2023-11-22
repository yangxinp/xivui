<template>
  <div class="handler">
    <div class="item">
      <span>Auto</span>
      <x-switch v-model:value="fixed" />
      <span>Fixed</span>
    </div>
  </div>

  <x-table :data="data" fixed-header max-height="300px" :layout="fixed ? 'fixed' : 'auto'">
    <x-table-column label="Name" prop="name" />
    <x-table-column label="Age" prop="age" />
    <x-table-column label="Address" prop="address" />
  </x-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fixed = ref(true)

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