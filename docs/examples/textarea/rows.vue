<template>
  <x-textarea v-model:value="value" label="Underlined" :rows="2" placeholder="Two rows" />
  <x-textarea v-model:value="value" variant="outlined" label="Outlined" :rows="3" placeholder="Three rows" />
  <x-textarea v-model:value="value" variant="filled" label="Filled" :rows="4" placeholder="Three Four" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>