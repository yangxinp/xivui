import path from 'path'
import { defineConfig, UserConfig, Alias, searchForWorkspaceRoot } from "vite"
import vueJsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'
import { markdownTransform } from './.vitepress/plugins/vite-md-transform'

export default defineConfig(({ command }) => {
  const alias: Alias[] = []

  if (command === 'serve') {
    // xivui -> ./src
    alias.push({
      find: /^xivui(\/(?!(?:es)|(?:lib))(?:.+))?$/,
      replacement: path.resolve(__dirname, '../src$1')
    })
    // xivui/es -> ./es
    alias.push({
      find: /^xivui\/es(.*)$/,
      replacement: path.resolve(__dirname, '../es$1')
    })
    // xivui/lib -> ./lib
    alias.push({
      find: /^xivui\/lib(.*)$/,
      replacement: path.resolve(__dirname, '../lib$1')
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
        '../src'
      ]
    }
  }

  return config
})