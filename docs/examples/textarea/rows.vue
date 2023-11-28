<template>
  <x-textarea v-model:value="value" label="Textarea" :rows="2" placeholder="Two rows" />
  <x-textarea v-model:value="value" label="Textarea" variant="outlined" :rows="3" placeholder="Three rows" />
  <x-textarea v-model:value="value" label="Textarea" variant="filled" :rows="4" placeholder="Three Four" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>