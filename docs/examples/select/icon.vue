<template>
  <div>value: {{ value }}</div>
  <br />
  <x-select v-model:value="value" label="Label1" :options="options" clearable prefix-icon="account"
    prefix-outer-icon="account-box-multiple-outline" suffix-icon="account-circle" suffix-outer-icon="account-check" />
  <x-select v-model:value="value" label="Label2" :options="options" variant="outlined" clearable prefix-icon="account"
    prefix-outer-icon="account-box-multiple-outline" suffix-icon="account-circle" suffix-outer-icon="account-check" />
  <x-select v-model:value="value" label="Label3" :options="options" variant="filled" clearable prefix-icon="account"
    prefix-outer-icon="account-box-multiple-outline" suffix-icon="account-circle" suffix-outer-icon="account-check" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('22')

const options = ref([
  { label: 'AA', value: '11' },
  { label: 'BB', value: '22' },
  { label: 'CC', value: '33' },
  { label: 'DD', value: '44' },
  { label: 'EE', value: '55' },
  { label: 'FF', value: '66' },
])
</script>