<template>
  <div class="handler">
    <x-radio-group v-model:value="type" inline>
      <x-radio value="elevated">Elevated</x-radio>
      <x-radio value="tonal">Tonal</x-radio>
      <x-radio value="outlined">Outlined</x-radio>
      <x-radio value="flat">Flat</x-radio>
    </x-radio-group>
  </div>

  <div class="container">
    <x-card :type="type" title="Title" subtitle="Subtitle" content="Simple content" />

    <x-card :type="type">
      <template #title>
        <span>Title</span>
        <x-icon type="arrow-left-circle" />
      </template>
      <template #subtitle>
        <x-icon type="pencil-outline" />
        <span>Subtitle</span>
      </template>
      <template #default>
        <x-icon type="clipboard-edit-outline" />
        <span>Simple Content</span>
      </template>
    </x-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const type = ref('elevated');
</script>

<style scoped>
.handler {
  margin-bottom: 16px;
}

.container .x-card {
  margin-right: 16px;
}
</style>