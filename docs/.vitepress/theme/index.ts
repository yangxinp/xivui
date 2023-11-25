import xivui from 'xivui'
import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import VPLayout from './vp-layout.vue'
import Demo from '../components/demo.vue'

import '@mdi/font/css/materialdesignicons.min.css'
import '../styles/index.scss'

const theme: Theme = {
  ...DefaultTheme,
  Layout: VPLayout,
  enhanceApp: ({ app }) => {
    app.use(xivui)
    app.component('Demo', Demo)
  }
}

export default theme