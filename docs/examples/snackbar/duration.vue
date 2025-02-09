<template>
  <x-button color="indigo" @click="open1">close: true</x-button>
  <br /><br />

  <x-button color="indigo" @click="open2">callback -> close()</x-button>
  <br /><br />

  <x-button color="indigo" @click="open3">callback -> SnackbarApi.remove(key)</x-button>
</template>

<script setup lang="ts">
import { SnackbarApi } from 'xivui';

function open1() {
  SnackbarApi.open({
    duration: 0,
    close: true,
    rounded: true,
    placement: 'bottom',
    content: 'It needs to be closed manually',
  })
}

function open2() {
  SnackbarApi.open({
    duration: 0,
    rounded: true,
    placement: 'bottom',
    content: 'It needs to be closed manually',
  }, ({ key, close }) => {
    setTimeout(() => close(), 1000)
  })
}

function open3() {
  SnackbarApi.open({
    duration: 0,
    rounded: true,
    placement: 'bottom',
    content: 'It needs to be closed manually',
  }, ({ key, close }) => {
    setTimeout(() => {
      SnackbarApi.remove(key)
    }, 1000)
  })
}
</script>