<template>
  <x-switch v-model:value="prepend"></x-switch>显示前缀图标
  <x-switch v-model:value="append"></x-switch>显示后缀图标
  <br />
  <x-chip type="tonal" :prepend-icon="prepend ? 'account-circle-outline' : ''"
    :append-icon="append ? 'account-circle-outline' : ''">Tonal</x-chip>
  <x-chip type="elevated" :prepend-icon="prepend ? 'account-circle-outline' : ''"
    :append-icon="append ? 'account-circle-outline' : ''">Elevated</x-chip>
  <x-chip type="outlined" :prepend-icon="prepend ? 'account-circle-outline' : ''"
    :append-icon="append ? 'account-circle-outline' : ''">Outlined</x-chip>
  <x-chip type="text" :prepend-icon="prepend ? 'account-circle-outline' : ''"
    :append-icon="append ? 'account-circle-outline' : ''">Text</x-chip>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const prepend = ref(true)
const append = ref(true)
</script>