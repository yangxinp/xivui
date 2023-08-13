<template>
  <div class="vp-source-wrapper">
    <div class="vp-source language-vue" v-html="decoded" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  source: string
}>()

const decoded = computed(() => decodeURIComponent(props.source))
</script>

<style scoped lang="scss">
.vp-source-wrapper {
  transition: height 0.3s ease-in;
}
</style>