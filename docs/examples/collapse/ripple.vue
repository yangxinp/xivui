<template>
  <x-collapse v-model:value="value" ripple>
    <x-collapse-panel key="first" title="Title1">
      <div>
        content content content
        content content content
        content content content
        content content content
      </div>
    </x-collapse-panel>
    <x-collapse-panel title="Title2">
      xxxxxxx xxxxxxx xxxxxxx
      xxxxxxx xxxxxxx xxxxxxx
      xxxxxxx xxxxxxx xxxxxxx
      xxxxxxx xxxxxxx xxxxxxx
    </x-collapse-panel>
    <x-collapse-panel title="Title3">
      xxxxxxx xxxxxxx xxxxxxx
      xxxxxxx xxxxxxx xxxxxxx
      xxxxxxx xxxxxxx xxxxxxx
      xxxxxxx xxxxxxx xxxxxxx
    </x-collapse-panel>
  </x-collapse>
</template>

<script setup lang="ts">
import { ref } from "vue"

const value = ref('first')
</script>