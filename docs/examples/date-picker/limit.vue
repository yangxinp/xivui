<template>
  <div>value: {{ rangeValue.join(' ~ ') || '-' }}</div>
  <x-date-picker v-model:value="rangeValue" range :min="min" :max="max" />

  <br/>
  <br/>

  <div>value: {{ multipleValue.join(',') || '-' }}</div>
  <x-date-picker v-model:value="multipleValue" multiple :min="min" :max="max" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const rangeValue = ref<string[]>([])
const multipleValue = ref<string[]>([])

const min = ref('2020-05-01')
const max = ref('2024-05-01')
</script>