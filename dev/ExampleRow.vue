<template>
  <div class="example-row">
    <div class="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ExampleRow',
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.example-row {
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 12px;
  .title {
    padding: 12px 0;
    color: #555;
  }
}
</style>