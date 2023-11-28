<template>
  <x-tabs v-model:value="value" fixed class="green text-white">
    <x-tab v-for="item in tabs" :key="item.name" :name="item.name">
      <template #default="{ name, disabled, active }">
        <x-icon :type="active ? item.icon : item.icon + '-outline'" />
        <span :style="{ fontWeight: active ? 'bold' : undefined }">{{ name }}</span>
      </template>
    </x-tab>
  </x-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('')

const tabs = ref([
  { name: 'TAB1', icon: 'home' },
  { name: 'TAB2', icon: 'coffee' },
  { name: 'TAB3', icon: 'music-box' },
  { name: 'TAB4', icon: 'account' },
])
</script>

<style scoped>
.x-tab .x-icon, .x-tab span {
  transition: all 0.1s ease-out;
}
</style>