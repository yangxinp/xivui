import { computed, defineComponent, h, nextTick, ref, shallowRef, vShow, watch, withDirectives } from "vue";
import Input, { makeInputProps } from "../Input";
import { List, ListItem } from "../List"
import Overlay from "../_Overlay";
import { usePopper } from "../../compositions/popper";
import { wrapInArray } from "../../utils";
import Chip from "../Chip";

const Select = defineComponent({
  emits: ['update:value', 'input', 'update:filterQuery'],

  name: "x-select",

  props: {
    value: [String, Number, Object, Array],
    options: {
      type: Array,
      default: () => []
    },
    placeholder: String,
    multiple: Boolean,
    chips: Boolean,
    chipsClosable: Boolean,
    chipsCollapse: Boolean,
    object: Boolean,
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    filterable: Boolean,
    filterQuery: String,
    ...makeInputProps()
  },

  setup(props, { attrs, emit }) {
    const filterRef = ref<HTMLInputElement>()
    const inputRef = ref<InstanceType<typeof Input>>()
    const overlayRef = ref<InstanceType<typeof Overlay>>()

    const activetorRef = shallowRef<HTMLElement>()
    const contentRef = shallowRef<HTMLElement>()

    const { contentStyle, initPosition } = usePopper({
      contentEle: contentRef,
      activatorEle: activetorRef
    }, { inheritWidth: true })

    const isHandle = ref(false)
    const isFocus = ref(false)

    const menu = ref(false)

    const iValue = computed({
      get () : any[] {
        return wrapInArray(props.value)
      },
      set (v : any[]) {
        if (!props.multiple && v.length === 1) {
          emit('input', v[0])
          emit('update:value', v[0])
        } else {
          emit('input', v)
          emit('update:value', v)
        }
      }
    })
    const selections = computed(() => {
      if (props.object) return iValue.value

      return iValue.value.map(val => props.options.find(opt => _isEqual(val, opt)))
    })
    const iDisabled = computed(() => props.disabled)
    const error = computed(() => !!selections.value.length)
    const message = computed(() => error.value ? 'Not Required - Test' : '')

    watch(() => inputRef.value?.$el, (v) => activetorRef.value = v)
    watch(() => overlayRef.value?.contentRef, (v) => contentRef.value = v)
    watch(() => props.value, () => menu.value && initPosition())

    function _isEqual(value: any, item: any) {
      const _key = props.valueKey
      return props.object
        ? value[_key] === item[_key]
        : value === item[_key]
    }

    function _getLabel(item: any) {
      return item[props.labelKey]
    }

    function _unValue(item: any) {
      return props.object ? item : item[props.valueKey]
    }

    function selected(item: any, idx?: number, activeIdx?: number) {
      if (activeIdx === undefined) activeIdx = isActive(item)

      if (!props.multiple) {
        iValue.value = [_unValue(item)]

        isHandle.value = false
        menu.value = false
        return
      }

      const duplicate = [...iValue.value]
      if (activeIdx > -1) {
        duplicate.splice(activeIdx, 1)
      } else {
        duplicate.push(_unValue(item))
      }
      iValue.value = duplicate
    }

    function remove(idx: number) {
      const duplicate = [...iValue.value]
      duplicate.splice(idx, 1)
      iValue.value = duplicate
    }

    function isActive(item: any) {
      return iValue.value.findIndex(val => _isEqual(val, item))
    }

    function clickOutsideHandler() {
      isHandle.value = false
      isFocus.value = false
      menu.value = false
    } 

    function onFocus(e: FocusEvent) {
      isFocus.value = true
    }

    function onBlur(e: FocusEvent) {
      isFocus.value = false
    }

    function onFilterInput(e: InputEvent) {
      emit('update:filterQuery', (e.target as HTMLInputElement).value)
    }

    function handleClick() {
      if (iDisabled.value) return

      isHandle.value = true
      menu.value = true

      if (props.filterable) nextTick(() => filterRef.value?.focus())
    }

    function handleClear() {
      emit('update:value', props.multiple ? null : [])
    }

    const _renderSelections = () => {
      return selections.value.map((item, idx) => {
        const isLast = selections.value.length - 1 === idx

        return props.chips
          ? h(Chip, {
              class: 'x-select--selection',
              closable: !iDisabled.value && props.chipsClosable,
              onClick: () => remove(idx)
            }, () => _getLabel(item))
          : h('div', { class: 'x-select--selection' }, _getLabel(item) + (isLast ? '' : ','))
      })
    }

    const _renderList = () => {
      return h(List, {}, () => {
        if (!props.options.length) {
          return [h(ListItem, { disabled: true }, 'no-data')]
        }

        return props.options.map((item, idx) => {
          const activeIdx = isActive(item)

          return h(ListItem, {
            active: activeIdx > -1,
            onClick: () => selected(item, idx, activeIdx)
          }, () => _getLabel(item))
        })
      })
    }

    const _renderContent = () => {
      return [
        ..._renderSelections(),
        withDirectives(h('input', {
          class: 'x-select--input',
          value: props.filterQuery,
          onFocus,
          onBlur,
          onInput: onFilterInput,
          ref: filterRef
        }), [[vShow, props.filterable && isHandle.value]])
      ]
    }

    const _renderMenu = () => {
      return h(Overlay, {
        class: 'x-select--menu',
        active: menu.value,
        style: contentStyle.value,
        absolute: true,
        clickOutside: {
          handler: clickOutsideHandler,
          include: () => [inputRef.value?.$el as HTMLElement]
        },
        ref: overlayRef
      }, _renderList)
    }

    return {
      iValue,
      selections,
      render: () => {
        return h(Input, {
          moveLabel: isHandle.value || !!selections.value.length || !!props.placeholder,
          active: isHandle.value,
          class: 'x-select',
          ...props,
          disabled: iDisabled.value,
          clearable: props.clearable && !!props.value,
          error: error.value,
          message: message.value,
          onClick: handleClick,
          ref: inputRef,
          'onClick:clear': handleClear
        }, () => [
          ..._renderContent(),
          _renderMenu()
        ])
    
        return (
          <Input>
            <div>
              { props.chips ?  [<Chip>select1</Chip>] : [<div>select1</div>] }
              <input />
            </div>

            <Overlay>
              <List class="menu">
                <ListItem></ListItem>
              </List>
            </Overlay>
          </Input>
        );
      }
    }
  },

  render() {
    return this.render()
  },
});

export default Select