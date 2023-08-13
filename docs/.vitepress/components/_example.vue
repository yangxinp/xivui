<template>
  <div class="vp-example">
    <component :is="demo" v-if="demo" v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  demo: object,
}>()
</script>

<style scoped lang="scss">
.vp-example {
  padding: 1.5rem;
}
</style>

