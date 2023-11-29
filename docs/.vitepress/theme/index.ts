import xivui from 'xivui'
// import xivui from 'xivui/es'
import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import VPLayout from './vp-layout.vue'
import Demo from '../components/demo.vue'
import ExhibitColor from '../components/exhibit-color.vue'
import ExhibitElevation from '../components/exhibit-elevation.vue'

import '@mdi/font/css/materialdesignicons.min.css'
import 'xivui/components/styles'
// import 'xivui/es/components/styles'

const theme: Theme = {
  ...DefaultTheme,
  Layout: VPLayout,
  enhanceApp: ({ app }) => {
    app.use(xivui)
    app.component('Demo', Demo)
    app.component('ExhibitColor', ExhibitColor)
    app.component('ExhibitElevation', ExhibitElevation)
  }
}

export default theme