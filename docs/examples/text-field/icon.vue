<template>
  <x-text-field
    v-model:value="value"
    label="TextField"
    prefix-icon="account"
    prefix-outer-icon="emoticon"
    suffix-icon="account-circle"
    suffix-outer-icon="account-check" />

  <x-text-field
    v-model:value="value"
    label="TextField"
    variant="outlined"
    prefix-icon="account"
    prefix-outer-icon="emoticon"
    suffix-icon="account-circle"
    suffix-outer-icon="account-check" />

  <x-text-field
    v-model:value="value"
    label="TextField"
    variant="filled"
    prefix-icon="account"
    prefix-outer-icon="emoticon"
    suffix-icon="account-circle"
    suffix-outer-icon="account-check" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')
</script>