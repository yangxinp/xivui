<template>
  <div class="container">
    <x-card hover title="Title" subtitle="Subtitle" content="Simple content" />
    <x-card hover title="Title" subtitle="Subtitle" content="Simple content" type="tonal" />
    <x-card hover title="Title" subtitle="Subtitle" content="Simple content" type="outlined" />
    <x-card hover title="Title" subtitle="Subtitle" content="Simple content" type="flat" />
  </div>
</template>

<style scoped>
.container .x-card {
  margin-right: 12px;
}
</style>