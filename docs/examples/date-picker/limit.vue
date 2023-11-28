<template>
    <div class="container">
      <x-date-picker
        v-model:value="value1"
        range
        :min="limit.min"
        :max="limit.max" />
      <div class="value">Range value: {{ value1.join(' ~ ') || '-' }}</div>
    </div>

    <div class="container">
      <x-date-picker
        v-model:value="value2"
        range
        desktop
        :min="desktopLimit.min"
        :max="desktopLimit.max" />
      <div class="value">Range value: {{ value2.join(' ~ ') || '-' }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(['2020-10-14', '2020-10-22'])
const value2 = ref(['2020-10-16', '2020-11-19'])

const limit = ref({
  min: '2020-10-06',
  max: '2020-10', // tip: 自动识别成最后一天 2020-10-31
})
const desktopLimit = ref({
  min: '2020-10-08',
  max: '2020-11-26',
})
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container .value {
  font-weight: bold;
  margin-bottom: 24px;
}
</style>