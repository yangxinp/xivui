<template>
  <x-tabs v-model:value="value" fixed class="blue text-white">
    <x-tab name="tab1">Tab1</x-tab>
    <x-tab name="tab2" disabled>Tab2</x-tab>
    <x-tab name="tab3" disabled>Tab3</x-tab>
    <x-tab name="tab4">Tab4</x-tab>
  </x-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>