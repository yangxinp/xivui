<template>
  <div class="vp-demo vp-raw">
    <ClientOnly>
      <Example :demo="demo" />
    </ClientOnly>

    <div class="vp-demo-btns">
      <x-button circle text>
        <x-icon type="content-copy" />
      </x-button>
      <x-button circle text @click="() => isExpand = !isExpand">
        <x-icon type="code-tags" />
      </x-button>
    </div>

    <Transition v-bind="expandHook">
      <Source v-if="isExpand" :source="source" />
    </Transition>
    
    <Transition name="fade-transition">
      <div class="vp-demo-sticky" v-show="isExpand">
        <x-button
          class="vp-demo-expand"
          block
          @click="() => isExpand = !isExpand">Hide</x-button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Example from './_example.vue'
import Source from './_source.vue'
import expand from '../../../src/components/transitions/expand'

const props = defineProps<{
  demo: object,
  source: string,
}>()

const expandHook = expand(true)

const isExpand = ref(false)
</script>

<style scoped lang="scss">
.vp-demo {
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;

  &-btns {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #dcdfe6;
    padding: 0.1rem 0.5rem;
  }

  &-sticky {
    position: sticky;
    bottom: 0;
    border-top: 1px solid #dcdfe6;
    transition-duration: 0.15s;
    z-index: 9;
  }

  &-expand {
    border-radius: 0;
  }
}
</style>