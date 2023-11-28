<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter: fm } = useData()

function isExternal (url: string) {
  return /^https?:\/\//.test(url)
}
</script>

<template>
  <div class="VPHero">
    <div class="container">
      <div class="main">
        <h1 v-if="fm.title" class="name">{{ fm.title }}</h1>
        <p v-if="fm.subtitle" class="text">{{ fm.subtitle }}</p>
        <p v-if="fm.description" class="tagline">{{ fm.description }}</p>

        <div class="actions">
          <x-button 
            v-for="action in fm.actions"
            tag="a"
            :key="action.link"
            :href="action.link"
            :target="isExternal(action.link) ? '_blank' : undefined"
            rounded
          >
            <x-icon v-if="action.icon" :type="action.icon" />
            <span>{{ action.text }}</span>
          </x-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.actions .x-button {
  background-color: var(--vp-home-hero-name-color);
  color: white;
}

.VPHero {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 24px 48px;
}

@media (min-width: 640px) {
  .VPHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 48px 64px;
  }
}

@media (min-width: 960px) {
  .VPHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 64px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;
}

@media (min-width: 960px) {
  .container {
    flex-direction: row;
  }
}

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  order: 2;
  flex-grow: 1;
  flex-shrink: 0;
}

@media (min-width: 960px) {
  .main {
    order: 1;
    width: calc((100% / 3) * 2);
  }
}

.name,
.text {
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;
}

.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

@media (min-width: 640px) {
  .name,
  .text {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }
}

@media (min-width: 960px) {
  .name,
  .text {
    line-height: 64px;
    font-size: 56px;
  }
}

.tagline {
  padding-top: 8px;
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .tagline {
    padding-top: 12px;
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .tagline {
    line-height: 36px;
    font-size: 24px;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  margin: -6px;
  padding-top: 24px;
}

@media (min-width: 640px) {
  .actions {
    padding-top: 32px;
  }
}

.actions button {
  margin: 6px;
}
.actions button:first-of-type {
  color: var(--vp-home-hero-name-color);
}
</style>
