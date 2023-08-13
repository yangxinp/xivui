<template>
  <div>value: {{ value }}</div>
  <br />
  <x-select
    v-model:value="value"
    v-model:filter-query="query"
    :options="options"
    :loading="loading"
    label="Label"
    filterable
    object
    clearable />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Option {
  label: string,
  value: string
}

const query = ref('')
const loading = ref(false)

const value = ref<Option>({ label: 'GG', value: '77' })
const options = ref<Option[]>()

async function optionLoader(text: string) {
  if (!text.trim()) {
    options.value = []
    loading.value = false
    return
  }

  loading.value = true

  await new Promise((resolve) => setTimeout(resolve, 500))

  if (text !== query.value) return

  options.value = [
    { label: 'Text1:' + text, value: 'Value1:' + text },
    { label: 'Text2:' + text, value: 'Value2:' + text },
    { label: 'Text3:' + text, value: 'Value3:' + text },
    { label: 'Text4:' + text, value: 'Value4:' + text },
  ]

  loading.value = false
}

watch(query, (val) => optionLoader(val))
</script>