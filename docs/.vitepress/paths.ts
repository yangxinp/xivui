import { resolve } from 'path'

export const projectRoot = resolve(__filename, '..', '..', '..')
export const docsRoot = resolve(projectRoot, './docs')

export const docsCompRoot = resolve(docsRoot, '.\\zh\\components')
export const docsExampRoot = resolve(docsRoot, './examples')