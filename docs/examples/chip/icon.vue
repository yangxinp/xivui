<template>
  <x-checkbox v-model:checked="prepend">Show prepend icon</x-checkbox>
  <x-checkbox v-model:checked="append">Show append icon</x-checkbox>

  <div>
    <x-chip
      type="tonal"
      :prepend-icon="prepend ? 'account-circle-outline' : ''"
      :append-icon="append ? 'account-circle-outline' : ''"
      >Tonal</x-chip
    >
    <x-chip
      type="elevated"
      :prepend-icon="prepend ? 'account-circle-outline' : ''"
      :append-icon="append ? 'account-circle-outline' : ''"
      >Elevated</x-chip
    >
    <x-chip
      type="outlined"
      :prepend-icon="prepend ? 'account-circle-outline' : ''"
      :append-icon="append ? 'account-circle-outline' : ''"
      >Outlined</x-chip
    >
    <x-chip
      type="text"
      :prepend-icon="prepend ? 'account-circle-outline' : ''"
      :append-icon="append ? 'account-circle-outline' : ''"
      >Text</x-chip
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const prepend = ref(true);
const append = ref(true);
</script>

<style scoped>
.x-checkbox {
  margin-right: 12px;
  margin-bottom: 24px;
}
</style>