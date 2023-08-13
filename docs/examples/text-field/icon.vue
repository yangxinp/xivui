<template>
  <x-text-field
    v-model:value="value"
    label="Underlined"
    prefix-icon="account"
    prefix-outer-icon="account-box-multiple-outline"
    suffix-icon="account-circle"
    suffix-outer-icon="account-check" />

  <x-text-field
    v-model:value="value"
    label="Outlined"
    variant="outlined"
    prefix-icon="account"
    prefix-outer-icon="account-box-multiple-outline"
    suffix-icon="account-circle"
    suffix-outer-icon="account-check" />

  <x-text-field
    v-model:value="value"
    label="Filled"
    variant="filled"
    prefix-icon="account"
    prefix-outer-icon="account-box-multiple-outline"
    suffix-icon="account-circle"
    suffix-outer-icon="account-check" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>