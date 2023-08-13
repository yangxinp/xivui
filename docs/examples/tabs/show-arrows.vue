<template>
  <x-tabs v-model:value="value" show-arrows centered>
    <x-tab v-for="idx in tabNum" :key="idx" :name="idx">tab {{ idx }}</x-tab>
  </x-tabs>
  <br />
  <x-button outlined @click="tabNum++">add</x-button>
  <x-button outlined @click="tabNum--">remove</x-button>
  <x-button outlined @click="() => { value = ++tabNum }">add & active</x-button>
  <x-button outlined @click="() => { value = --tabNum }">remove & active</x-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(5)
const tabNum = ref(10)
</script>