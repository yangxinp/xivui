import path from 'path'
import { defineConfig, UserConfig, Alias, searchForWorkspaceRoot } from "vite"
import vueJsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'
import { markdownTransform } from './.vitepress/plugins/vite-md-transform'

export default defineConfig(({ command }) => {
  const alias: Alias[] = []

  if (command === 'serve') {
    alias.push({
      find: /^xivui(\/(es|lib))?$/,
      replacement: path.resolve(__dirname, '../src/index.ts')
    })
  }

  const config: UserConfig = {
    ssr: {
      noExternal: ['xivui']
    },
    server: {
      fs: {
        allow: [
          searchForWorkspaceRoot(process.cwd()),
          '..'
        ]
      },
    },
    resolve: { alias },
    plugins: [
      vueJsx({}),
      markdownTransform(),
      Inspect(),
    ],
    assetsInclude: ['.woff2', '.woff', '.ttf'],
    optimizeDeps: {
      exclude: [
        '../es',
        '../lib',
        '../src/components'
      ]
    }
  }

  return config
})