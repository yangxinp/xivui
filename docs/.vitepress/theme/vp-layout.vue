<template>
  <Layout>
    <template #not-found>
      <VPNotFound />
    </template>

    <template #home-hero-before>
      <VPHome />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import VPNotFound from './vp-not-found.vue'
import VPHome from './vp-home.vue';

const { Layout } = DefaultTheme
</script>

<style>
</style>