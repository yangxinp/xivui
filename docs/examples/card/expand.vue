<template>
  <x-card width="300px" title="Title" subtitle="Beautiful scenery" :expand="expand">
    <template #media>
      <div class="media-title">Forest</div>
      <img src="https://assets.hxin.link/img/backgroup.jpg" />
    </template>
    <template #footer>
      <div class="media-footer">
        <x-button text circle @click="() => expand = !expand">
          <x-icon :type="expand ? 'chevron-up' : 'chevron-down'" />
        </x-button>
      </div>
    </template>
  </x-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const expand = ref(false)
</script>

<style scoped>
.media-title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 32px 16px;
  font-size: 32px;
  font-weight: bold;
  color: white;
}

.media-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
