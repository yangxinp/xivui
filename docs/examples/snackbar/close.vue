<template>
  <x-snackbar rounded>
    component -> custom close
    <template #action>
      <x-button circle text color="blue">
        <x-icon type="close-circle"></x-icon>
      </x-button>
    </template>
  </x-snackbar>
  <br/><br />

  <x-button color="indigo" @click="open">open</x-button>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Button, Icon, SnackbarApi } from 'xivui';

function open() {
  SnackbarApi.open({
    duration: 0,
    rounded: true,
    placement: 'bottom',
    content: 'api -> custom close',
    close: (closed) => {
      return h(Button, {
        circle: true,
        text: true,
        color: 'blue',
        onClick: closed,
      }, h(Icon, { type: 'close-circle' }))
    }
  })
}
</script>