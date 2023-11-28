import { defineConfig } from 'vitepress'
import domePlugins from './plugins/md-dome'
import tableWrapper from './plugins/table-wrapper'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "xivui",
  description: "a Vue 3 based component library for designers and developers",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Components', link: '/zh/components/button' },
      { text: 'Blog', link: 'https://www.hxin.link' },
    ],

    sidebar: [
      {
        text: 'Basic 基础',
        items: [
          { text: 'Install 安装', link: '/zh/components/install' },
          { text: 'Started 快速开始', link: '/zh/components/started' },
          { text: 'Color 颜色', link: '/zh/components/color' },
          { text: 'Elevation 海拔', link: '/zh/components/elevation' },
        ]
      },
      {
        text: 'Components 组件',
        items: [
          { text: 'Icon 图标', link: '/zh/components/icon' },
          { text: 'Button 按钮', link: '/zh/components/button' },
          { text: 'Checkbox 多选框', link: '/zh/components/checkbox' },
          { text: 'Chip 纸片', link: '/zh/components/chip' },
          { text: 'Date Picker 日期选择器', link: '/zh/components/date-picker' },
          { text: 'Dialog 日期选择器', link: '/zh/components/dialog' },
          { text: 'Slider 滑块', link: '/zh/components/slider' },
          { text: 'Old Slider 滑块（旧版）', link: '/zh/components/old-slider' },
          { text: 'ProgressCircular 环状进度', link: '/zh/components/progress-circular' },
          { text: 'ProgressLinear 进度条', link: '/zh/components/progress-linear' },
          { text: 'Radio 单选框', link: '/zh/components/radio' },
          { text: 'Select 选择器', link: '/zh/components/select' },
          { text: 'Switch 开关', link: '/zh/components/switch' },
          { text: 'Tabs 选项卡', link: '/zh/components/tabs' },
          { text: 'TextField 输入框', link: '/zh/components/text-field' },
          { text: 'Textarea 文本域', link: '/zh/components/textarea' },
          { text: 'Table 表格', link: '/zh/components/table' },
          { text: 'Card 卡片', link: '/zh/components/card' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yangxinp' }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(domePlugins, {})
      md.use(tableWrapper)
    }
  }
})
