<template>
  <div class="container">
    <div v-for="index in 25" class="box indigo-4 text-white" :class="'elevation-' + (index - 1)">
      <span>.elevation-{{ index - 1 }}</span>
    </div>
  </div>
</template>

<style scoped>
.container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 48px -40px -40px 0;
}

.box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  margin: 0 40px 40px 0;
  border-radius: 12px;
}
</style>