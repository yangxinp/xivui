<template>
  <div class="container">
    <div class="box text-blue">Blue Text Color</div>
    <div class="box text-red">Red Text Color</div>
    <div class="box text-yellow">Yellow Text Color</div>
    <div class="box green text-white">Green Background</div>
    <div class="box brown text-white">Brown Background</div>
    <div class="box orange text-white">Orange Background</div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px -8px 0;
}

.box {
  display: inline-block;
  width: calc(33% - 8px);
  padding: 8px;
  margin: 0 8px 8px 0;
  border: thin solid currentColor
}
</style>