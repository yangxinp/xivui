export function getOpt (opt) {
  const args = process.argv.slice(2)
  const idx = args.indexOf(opt)
  return idx > 0 ? args[idx] : undefined
}