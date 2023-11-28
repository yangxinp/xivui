<template>
  <div class="container">
    <x-progress-circular indeterminate style="font-size: 80px;" :value="20" />
    <x-progress-circular indeterminate :value="20" />
    <x-progress-circular indeterminate :value="40" :size="32" :width="6" />
    <x-progress-circular indeterminate :value="60" :size="48" :width="12" />
    <x-progress-circular indeterminate :value="80" :size="64" :width="14" />
    <x-progress-circular indeterminate :value="100" :size="100" :width="16" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.x-progress-circular {
  margin-right: 12px;
}
</style>