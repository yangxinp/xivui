<template>
  <div class="handler">
    <x-checkbox v-model:checked="show.title">Title</x-checkbox>
    <x-checkbox v-model:checked="show.subtitle">Subtitle</x-checkbox>
    <x-checkbox v-model:checked="show.content">Content</x-checkbox>
  </div>

  <div class="container">
    <x-card
      :title="show.title ? 'Title' : ''"
      :subtitle="show.subtitle ? 'Subtitle' : ''"
      :content="show.content ? 'Simple content' : ''"
    />

    <x-card>
      <template #title v-if="show.title">
        <span>Title</span>
        <x-icon type="arrow-left-circle" />
      </template>
      <template #subtitle v-if="show.subtitle">
        <x-icon type="pencil-outline" />
        <span>Subtitle</span>
      </template>
      <template #default v-if="show.content">
        <x-icon type="clipboard-edit-outline" />
        <span>Simple Content</span>
      </template>
    </x-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const show = ref({
  title: true,
  subtitle: true,
  content: true,
});
</script>

<style scoped>
.handler {
  margin-bottom: 16px;
}

.handler .x-checkbox {
  margin-right: 16px;
}

.container .x-card {
  margin-right: 16px;
}
</style>