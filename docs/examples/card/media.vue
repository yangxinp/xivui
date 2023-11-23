<template>
  <x-card
    width="300px"
    title="Title"
    subtitle="Subtitle"
    content="Simple content"
    media="https://assets.hxin.link/img/backgroup.jpg"
  />

  <x-card width="300px" title="Title" subtitle="Beautiful scenery">
    <template #media>
      <div class="media-title">Forest</div>
      <img src="https://assets.hxin.link/img/backgroup.jpg" />
    </template>
  </x-card>
</template>

<style scoped>
.x-card + .x-card {
  margin-left: 12px;
}

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
</style>
