<template>
  <div class="container">
    <x-progress-circular class="text-blue" :value="40" />
    <x-progress-circular class="text-green" :value="40" />
    <x-progress-circular class="text-purple" :value="40" indeterminate />
    <x-progress-circular class="text-orange" :value="40" indeterminate />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
}

.x-progress-circular {
  margin-right: 12px;
}
</style>