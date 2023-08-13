<template>
  <x-button @click="baseDialog = true">基础对话框</x-button>
  <x-button @click="customDialog = true">自定义对话框</x-button>

  <x-dialog v-model:value="baseDialog">
    <div class="box">很基础的对话框，点击外部和ESC会自动关闭弹窗。</div>
  </x-dialog>

  <x-dialog
    v-model:value="customDialog"
    title="标题"
    width="50%"
    modal
    persistent>
    <div style="height: 300px; overflow-y: auto;">
      <div v-for="num in 40">data: {{  num  }}</div>
    </div>
    <template #footer>
      <x-button @click="() => customDialog = false">取消</x-button>
      <x-button @click="() => customDialog = false">确认</x-button>
    </template>
  </x-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const baseDialog = ref(false)
const customDialog = ref(false)
</script>

<style scoped>
.box {
  padding: 1rem;
}
</style>