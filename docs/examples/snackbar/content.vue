<template>
  <x-snackbar rounded>
    <x-icon type="account"></x-icon>
    <span style="margin-left: 12px;">component -> custom content</span>
  </x-snackbar>
  <br/><br />

  <x-button color="indigo" @click="open">open</x-button>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Icon, SnackbarApi } from 'xivui';

function open() {
  SnackbarApi.open({
    rounded: true,
    placement: 'bottom',
    content: () => {
      return [
        h(Icon, { type: 'account' }),
        h('span', { style: { marginLeft: '12px' } }, 'api -> custom content')
      ]
    },
  })
}
</script>