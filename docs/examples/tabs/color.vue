<template>
  <x-tabs v-model:value="value" class="green-0 text-lime-7">
    <x-tab name="t1">Tab1</x-tab>
    <x-tab name="t2">Tab2</x-tab>
    <x-tab name="t3">Tab3</x-tab>
    <x-tab name="t4">Tab4</x-tab>
  </x-tabs>

  <x-tabs v-model:value="value" fixed class="text-purple">
    <x-tab name="t1">Tab1</x-tab>
    <x-tab name="t2">Tab2</x-tab>
    <x-tab name="t3">Tab3</x-tab>
    <x-tab name="t4">Tab4</x-tab>
  </x-tabs>

  <x-tabs v-model:value="value" class="red-9 text-white">
    <x-tab name="t1">Tab1</x-tab>
    <x-tab name="t2">Tab2</x-tab>
    <x-tab name="t3">Tab3</x-tab>
    <x-tab name="t4">Tab4</x-tab>
  </x-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('t2')
</script>

<style scoped>
.x-tabs + .x-tabs {
  margin-top: 12px;
}
</style>