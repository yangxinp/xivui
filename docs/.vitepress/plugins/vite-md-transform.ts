import type { Plugin } from "vite";

import path from 'path'
import { docsCompRoot, docsExampRoot } from '../paths'

const vueRE = /(<script[^>]*>)(?<script>.+)(<\/script>)(.*)/

function insertScript(code: string, insert: string[]) {
  const insert_code = insert.join('\n')

  if (!vueRE.test(code)) {
    return `<script setup>\n${insert_code}\n</script>\n${code}`
  }

  return code.replace(vueRE, (_, $1, $2, $3, $4) => {
    return `${$1}\n${insert_code}${$2}\n${$3}${$4}`
  })
}

export function markdownTransform(): Plugin {
  return {
    name: 'ui-md-transform',

    enforce: 'pre',

    async transform(code, id) {
      const info = path.parse(id)

      if (info.ext !== '.md') return
      if (info.dir != docsCompRoot.replace(/\\/g, '/')) return
      const exampRelt = path.relative(info.dir, docsExampRoot).replace(/\\/g, '/')

      return insertScript(code, [
        `const demos = import.meta.globEager("${exampRelt}/${info.name}/*.vue", { eager: true })`
      ])
    },
  }
}