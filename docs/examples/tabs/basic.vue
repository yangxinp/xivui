<template>
  <x-tabs v-model:value="value">
    <x-tab name="t1">Tab1</x-tab>
    <x-tab name="t2">Tab2</x-tab>
    <x-tab name="t3">Tab3</x-tab>
    <x-tab name="t4">Tab4</x-tab>
  </x-tabs>

  <div class="value">Value: {{ value }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('t2')
</script>

<style scoped>
.value {
  margin-top: 12px;
  text-align: center;
  font-weight: bold;
}
</style>