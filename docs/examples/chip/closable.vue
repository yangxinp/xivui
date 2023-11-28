<template>
  <x-checkbox style="margin-bottom: 24px" v-model:checked="closable"
    >Open closable</x-checkbox
  >

  <div>
    <x-chip
      type="tonal"
      prepend-icon="account-circle-outline"
      append-icon="account-circle-outline"
      :closable="closable"
      @close="onClose"
      >Tonal</x-chip
    >
    <x-chip
      type="elevated"
      prepend-icon="account-circle-outline"
      append-icon="account-circle-outline"
      :closable="closable"
      @close="onClose"
      >Elevated</x-chip
    >
    <x-chip
      type="outlined"
      prepend-icon="account-circle-outline"
      append-icon="account-circle-outline"
      :closable="closable"
      @close="onClose"
      >Outlined</x-chip
    >
    <x-chip
      type="tonal"
      prepend-icon="account-circle-outline"
      append-icon="account-circle-outline"
      :closable="closable"
      @close="onClose"
      >Text</x-chip
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const closable = ref(true);

const onClose = () => {
  console.log("close!");
};
</script>
