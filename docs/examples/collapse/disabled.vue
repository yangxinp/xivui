<template>
  <x-collapse v-model:value="value1">
    <x-collapse-panel key="first" title="Title1">
      <template #header>
        <div><x-icon type="account-circle-outline" />Title2</div>
      </template>
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
    <x-collapse-panel title="Title3" disabled>
      xxxxxxx xxxxxxx xxxxxxx
      xxxxxxx xxxxxxx xxxxxxx
      xxxxxxx xxxxxxx xxxxxxx
      xxxxxxx xxxxxxx xxxxxxx
    </x-collapse-panel>
  </x-collapse>

  <br /><br />

  <x-collapse v-model:value="value2" disabled>
    <x-collapse-panel key="first" title="Title1">
      <template #header>
        <div><x-icon type="account-circle-outline" />Title2</div>
      </template>
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

const value1 = ref('first')
const value2 = ref('')
</script>