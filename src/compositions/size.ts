import { computed, ExtractPropTypes } from 'vue'

export function size (prop: ExtractPropTypes<typeof size.prop>) {
  return computed(() => ({
    "x-small": prop.xSmall,
    "small": prop.small,
    "large": prop.large,
    "x-large": prop.xLarge,
    "default": !prop.xSmall && !prop.small && !prop.large && !prop.xLarge
  }))
}

size.prop = {
  xSmall: Boolean,
  small: Boolean,
  large: Boolean,
  xLarge: Boolean,
}
