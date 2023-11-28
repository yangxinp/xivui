<template>
  <x-tabs v-model:value="value" class="orange text-white" show-arrows centered>
    <x-tab v-for="idx in tabNum" :key="idx" :name="idx">Tab {{ idx }}</x-tab>
  </x-tabs>

  <div style="text-align: center; margin-top: 24px;">
    <x-button color="blue" @click="tabNum++">add</x-button>

    <x-button color="red" :disabled="!allowRemove" @click="tabNum--">remove</x-button>

    <x-button color="blue-9" @click="() => value = ++tabNum">add & active</x-button>

    <x-button color="red-9" :disabled="!allowRemove" click="() => value = --tabNum">remove & active</x-button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const value = ref(5)
const tabNum = ref(10)

const allowRemove = computed(() => tabNum.value > 1)
</script>