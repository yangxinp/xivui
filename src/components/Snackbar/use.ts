import { createVNode, defineComponent, ExtractPropTypes, h, onMounted, Ref, render, shallowRef } from 'vue'
import { Snackbars, SnackbarsInstance, SnackbarConfig } from './index'

interface SnackbarsAgent {
  ref: Ref<SnackbarsInstance | undefined>
}

const snackbarsInstance: { [key: string]: SnackbarsAgent } = {}

const WrapperProps = {
  placement: {
    type: String,
    default: 'top',
  }
}

type SnackbarWrapperPropsType = ExtractPropTypes<typeof WrapperProps>
type SnackbarOption = SnackbarWrapperPropsType & SnackbarConfig

function newSnackbars(
  props: SnackbarWrapperPropsType,
  callback: (p: SnackbarsAgent) => void
) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const Wrapper = defineComponent({
    inheritAttrs: false,

    props: WrapperProps,

    setup(_props) {
      const snackbarsRef = shallowRef<SnackbarsInstance>()

      onMounted(() => {
        callback({ ref: snackbarsRef })
      })

      return () => {
        return h('div', {
          class: [
            'x-snackbars-wrapper',
            'x-snackbars-wrapper-' + _props.placement,
          ],
        }, h(Snackbars, { ref: snackbarsRef }))
      }
    }
  })

  const vm = createVNode(Wrapper, props)
  // vm.appContext = 

  render(vm, div)
}

function getSnackbarsInstance(props: SnackbarWrapperPropsType, callback: (p: SnackbarsAgent) => void) {
  const key = props.placement

  if (snackbarsInstance[key]) {
    return callback(snackbarsInstance[key])
  } else {
    newSnackbars(props, (e) => {
      snackbarsInstance[key] = e
      callback(e)
    })
  }
}

export function open(
  option: Partial<SnackbarOption> = {},
  callback?: (p: ReturnType<SnackbarsInstance['add']>) => void
) {
  getSnackbarsInstance({
    placement: 'bottom',
    ...option,
  }, (e) => {
    if (!e.ref.value) return

    const result = e.ref.value.add({
      duration: 4500,
      ...option,
    })

    if (callback) callback(result)
  })
}

export function remove(key: any) {
  Object.keys(snackbarsInstance).forEach(k => {
    snackbarsInstance[k].ref.value?.remove(key)
  })
}

export const Api = {
  open,
  remove,
}