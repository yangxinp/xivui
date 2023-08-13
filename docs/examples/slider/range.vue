<template>
 <x-old-slider v-model:value="value1" range />
 <x-slider v-model:value="value2" range />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref([20, 50])
const value2 = ref([20, 50])
</script>