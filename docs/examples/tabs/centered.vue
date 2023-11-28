<template>
  <x-tabs v-model:value="value" class="text-green" centered>
    <x-tab v-for="idx in 15" :key="idx" :name="idx">Tab {{idx}}</x-tab>
  </x-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(5)
</script>