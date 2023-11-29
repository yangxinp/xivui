<template>
  <div class="color-container">
    <div v-for="group in colorGroups" class="color-group">
      <div
        v-for="color in group"
        class="color-item"
        :class="[color.variable, { light: color.light }]"
      >
        <span>{{ color.variable }}</span>
        <span>{{ color.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import color from '../data/color.json'

interface ColorItem {
  variable: string
  value: string
  light: boolean
}

function getColorGroups () {
  if (color.length === 0) return []
  
  const group: ColorItem[][] = []

  let previous = ''

  for (const [_var, _value] of color) {
    const [_, prefix = _var, num] = _var.match(/^(.+)-(\d+)$/) ?? []

    if (prefix !== previous) {
      group.push([])
      previous = prefix
    }
    
    group[group.length - 1].push({
      variable: _var,
      value: _value.startsWith('$') ? _value.slice(1) : _value,
      light: num ? Number(num) >= 6 : _var === 'white' ? false : true
    })
  }

  return group
}

const colorGroups = ref(getColorGroups()) 

</script>

<style scoped>
.color-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 48px;
  margin-right: -8px;
  margin-bottom: 24px;
  justify-content: center;
}

.color-group {
  display: inline-block;
  flex-direction: column;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  /* font-weight: bold; */
}

.color-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 220px;
  height: 48px;
  padding: 16px 12px;
  box-sizing: border-box;
  color: black;
}

.color-item.light {
  color: white;
}
</style>