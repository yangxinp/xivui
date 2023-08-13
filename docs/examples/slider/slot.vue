<template>
    <x-slider v-model:value="value1" >
      <template #thumb-label="{ value, type }">
        <span>{{ type }}:{{ value }}</span>
      </template>
    </x-slider>
    <x-slider v-model:value="value2" range>
      <template #thumb-label="{ value, type }">
        <span>{{ type }}:{{ value }}</span>
      </template>
    </x-slider>
 </template>
 
 <script setup lang="ts">
 import { ref } from 'vue';
 
 const value1 = ref(20)
 const value2 = ref([20, 50])
 </script>