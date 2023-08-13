<template>
  <x-tabs v-model:value="value" centered>
    <x-tab v-for="idx in 10" :key="idx" :name="idx">tab {{idx}}</x-tab>
  </x-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(5)
</script>