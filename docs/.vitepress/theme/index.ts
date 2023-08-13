
import UI from 'ui'
import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import VPLayout from './vp-layout.vue'
import Demo from '../components/demo.vue'

import '../styles/index.scss'

const theme: Theme = {
  ...DefaultTheme,
  Layout: VPLayout,
  enhanceApp: ({ app }) => {
    app.use(UI)

    app.component('Demo', Demo)
  }
}

export default theme