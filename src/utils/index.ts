export function wrapInArray<T>(v: T | T[] | null | undefined): T[] {
  return v != null ? (Array.isArray(v) ? v : [v]) : [];
}

export function unitOff(value: any, unit = 'px') {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const figure = value.match(new RegExp(`(.+)${unit}$`))?.[1]
    if (figure) return Number(figure)
  }
}

export function unitOn(value?: number, unit = 'px') {
  if (value === undefined) return
  return value + unit
}