<template>
  <x-progress-linear class="text-blue" :value="20" />
  <br />
  <x-progress-linear class="text-red" :value="30" :buffer-value="80" />
  <br />
  <x-progress-linear class="text-green" :value="20" :buffer-value="40" stream />
  <br />
  <x-progress-linear class="text-brown" indeterminate stream />
</template>
