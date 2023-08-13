<template>
  <x-old-slider :value="20" disabled />
  <x-old-slider :value="[20, 50]" range />

  <br />

  <x-slider :value="20" disabled />
  <x-slider :value="[20, 50]" range />
</template>
