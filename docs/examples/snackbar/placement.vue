<template>
  <x-button color="indigo" @click="() => open('left-top')">
    <x-icon type="arrow-top-left"></x-icon>
    <span>LeftTop</span>
  </x-button>
  <x-button color="indigo" @click="() => open('top')">
    <x-icon type="arrow-up"></x-icon>
    <span>Top</span>
  </x-button>
  <x-button color="indigo" @click="() => open('right-top')">
    <x-icon type="arrow-top-right"></x-icon>
    <span>RightTop</span>
  </x-button>
  <br /><br />

  <x-button color="indigo" @click="() => open('left-bottom')">
    <x-icon type="arrow-bottom-left"></x-icon>
    <span>LeftBottom</span>
  </x-button>
  <x-button color="indigo" @click="() => open('bottom')">
    <x-icon type="arrow-down"></x-icon>
    <span>Bottom</span>
  </x-button>
  <x-button color="indigo" @click="() => open('right-bottom')">
    <x-icon type="arrow-bottom-right"></x-icon>
    <span>RightBottom</span>
  </x-button>
  <br /><br />
</template>

<script setup lang="ts">
import { SnackbarApi } from 'xivui'

function open(placement: string) {
  SnackbarApi.open({
    rounded: true,
    placement,
    content: 'content',
  })
}
</script>