import path from 'path'
import { defineConfig, searchForWorkspaceRoot } from "vite"
import vueJsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'
import { markdownTransform } from './.vitepress/plugins/vite-md-transform'

export default defineConfig(() => {
  return {
    server: {
      fs: {
        allow: [
          searchForWorkspaceRoot(process.cwd()),
          '..'
        ]
      },
    },
    resolve: {
      alias: [
        {
          find: /^ui(\/(es|lib))?$/,
          replacement: path.resolve(__dirname, '../src/index.ts'),
        },
      ]
    },
    plugins: [
      vueJsx({}),
      markdownTransform(),
      Inspect(),
    ],
    assetsInclude: ['.woff2', '.woff', '.ttf'],
    optimizeDeps: {
      exclude: ['../src/components']
    }
  }
})