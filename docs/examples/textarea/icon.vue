<template>
  <x-textarea
    v-model:value="value"
    label="Textarea"
    prefix-icon="account"
    prefix-outer-icon="emoticon"
    suffix-icon="account-circle"
    suffix-outer-icon="account-check" />

  <x-textarea
    v-model:value="value"
    label="Textarea"
    variant="outlined"
    prefix-icon="account"
    prefix-outer-icon="emoticon"
    suffix-icon="account-circle"
    suffix-outer-icon="account-check" />

  <x-textarea
    v-model:value="value"
    label="Textarea"
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