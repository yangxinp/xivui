<template>
  <x-button color="blue" @click="open">open</x-button>
</template>

<script setup lang="ts">
import { SnackbarApi } from 'xivui'

function open() {
  SnackbarApi.open({
    rounded: true,
    placement: 'bottom',
    content: 'snackbar api ->',
  })
}
</script>