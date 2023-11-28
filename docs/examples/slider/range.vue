<template>
 <x-slider v-model:value="value" range />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref([20, 50])
</script>