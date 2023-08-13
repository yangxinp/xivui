<template>
  <x-old-slider v-model:value="value1" range :min="-50" :max="50" />
  <x-slider v-model:value="value1" range :min="-50" :max="50" />
 </template>
 
 <script setup lang="ts">
 import { ref } from 'vue';
 
 const value1 = ref([-20, 20])
 </script>