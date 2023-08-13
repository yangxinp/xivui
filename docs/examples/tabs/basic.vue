<template>
  <div>value: {{ value }}</div>
  <br />
  <x-tabs v-model:value="value">
    <x-tab name="tab1">Tab1</x-tab>
    <x-tab name="tab2">Tab2</x-tab>
    <x-tab name="tab3">Tab3</x-tab>
    <x-tab name="tab4">Tab4</x-tab>
  </x-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>