<template>
  <example-row title="Icon">
    <x-icon type="account-circle"></x-icon>
    <x-icon type="account-circle-outline"></x-icon>
  </example-row>
  <example-row title="Button">
    <div>size</div>
    <x-button x-large>
      <x-icon type="pencil" />
      <span>XLarge</span>
    </x-button>
    <x-button large>
      <x-icon type="account-circle-outline" />
      <span>Large</span>
    </x-button>
    <x-button>
      <x-icon type="account-circle-outline" />
      <span>Default</span>
    </x-button>
    <x-button small>
      <x-icon type="account-circle-outline" />
      <span>Small</span>
    </x-button>
    <x-button x-small>
      <x-icon type="account-circle-outline" />
      <span>XSmall</span>
    </x-button>
    <br />
    <div>loading</div>
    <x-button x-large loading>
      <x-icon type="account-circle-outline" />
      <span>XLarge</span>
    </x-button>
    <x-button large loading>
      <x-icon type="account-circle-outline" />
      <span>Large</span>
    </x-button>
    <x-button loading>
      <x-icon type="account-circle-outline" />
      <span>Default</span>
    </x-button>
    <x-button small loading>
      <x-icon type="account-circle-outline" />
      <span>Small</span>
    </x-button>
    <x-button x-small loading>
      <x-icon type="account-circle-outline" />
      <span>XSmall</span>
    </x-button>
    <br />
    <div>circle</div>
    <x-button circle>
      <x-icon type="account-circle-outline" />
    </x-button>
    <x-button circle text>
      <x-icon type="account-circle-outline" />
    </x-button>
    <x-button circle text outlined>
      <x-icon type="account-circle-outline" />
    </x-button>
    <x-button circle loading>
      <x-icon type="account-circle-outline" />
    </x-button>
    <br />
    <div>other</div>
    <x-button rounded>
      <x-icon type="alpha-a-box-outline" />
      <span>rounded</span>
    </x-button>
    <x-button outlined>
      <x-icon type="alpha-a-box-outline" />
      <span>outlined</span>
    </x-button>
    <x-button text>
      <x-icon type="alpha-a-box-outline" />
      <span>text</span>
    </x-button>
    <x-button rounded loading>
      <x-icon type="alpha-a-box-outline" />
      <span>rounded</span>
    </x-button>
    <x-button outlined loading>
      <x-icon type="alpha-a-box-outline" />
      <span>rounded</span>
    </x-button>
    <x-button text loading>
      <x-icon type="alpha-a-box-outline" />
      <span>text</span>
    </x-button>
    <br />
    <div>color</div>
    <x-button color="blue">
      <x-icon type="format-color-fill"></x-icon>
      <span>Blue</span>
    </x-button>
    <x-button color="red" outlined>
      <x-icon type="format-color-fill"></x-icon>
      <span>Red outlined</span>
    </x-button>
    <x-button color="yellow" text>
      <x-icon type="format-color-fill"></x-icon>
      <span>Yellow text</span>
    </x-button>
    <x-button color="blue" loading>
      <x-icon type="format-color-fill"></x-icon>
      <span>Blue</span>
    </x-button>
    <x-button color="red" loading outlined>
      <x-icon type="format-color-fill"></x-icon>
      <span>Red</span>
    </x-button>
    <x-button color="yellow" loading text>
      <x-icon type="format-color-fill"></x-icon>
      <span>Yellow</span>
    </x-button>
  </example-row>
  <example-row title="Input">
    <x-checkbox v-model:checked="input.icon">icon</x-checkbox>
    <x-checkbox v-model:checked="input.loading">loading</x-checkbox>
    <x-checkbox v-model:checked="input.disabled">dsiabled</x-checkbox>
    <x-checkbox v-model:checked="input.clearable">clearable</x-checkbox>

    <x-radio-group v-model:value="input.variant" inline>
      <x-radio value="underlined">underlined</x-radio>
      <x-radio value="outlined">outlined</x-radio>
      <x-radio value="filled">filled</x-radio>
    </x-radio-group>

    <x-input :variant="input.variant"></x-input>
  </example-row>
  <example-row title="TextField">
    <x-text-field
      v-model:value="textfield.value"
      :variant="input.variant"
      label="TextField"
      type="password"
      maxlength="22"
      :loading="input.loading"
      :disabled="input.disabled"
      :clearable="input.clearable"
      :prefix-icon="input.icon ? 'account-circle': ''"
      :prefix-outer-icon="input.icon ? 'account-circle' : ''"
      :suffix-icon="input.icon ? 'account-circle' : ''"
      :suffix-outer-icon="input.icon ? 'account-circle' : ''"
    />
  </example-row>  
  <example-row title="Textarea">
    <x-textarea
      v-model:value="textarea.value"
      :variant="input.variant"
      label="Textarea"
      type="password"
      placeholder="this is placeholder"
      auto-grow
      :loading="input.loading"
      :disabled="input.disabled"
      :clearable="input.clearable"
      :prefix-icon="input.icon ? 'account-circle': ''"
      :prefix-outer-icon="input.icon ? 'account-circle' : ''"
      :suffix-icon="input.icon ? 'account-circle' : ''"
      :suffix-outer-icon="input.icon ? 'account-circle' : ''"
    />
  </example-row>
  <example-row title="Select">
    <x-select
      v-model:value="select.value"
      label="Select"
      multiple
      clearable
      chips
      chips-closable
      filterable
      v-model:filter-query="select.query"
      :options="select.options"
      :variant="input.variant"
      :loading="input.loading"
      :disabled="input.disabled"
      :clearable="input.clearable"
      :prefix-icon="input.icon ? 'account-circle': ''"
      :prefix-outer-icon="input.icon ? 'account-circle' : ''"
      :suffix-icon="input.icon ? 'account-circle' : ''"
      :suffix-outer-icon="input.icon ? 'account-circle' : ''"
    />
  </example-row>
  <example-row title="ProgressCircular">
    <x-progress-circular :indeterminate="pgscir.indeterminate" :value="pgscir.value" :size="32" />
    <x-progress-circular :indeterminate="pgscir.indeterminate" :value="pgscir.value" />
    <x-progress-circular :value="pgscir.value"></x-progress-circular>
    <x-button circle @click="pgscir.value -= 10">-</x-button>
    <span>value: {{ pgscir.value }}</span>
    <x-button circle @click="pgscir.value += 10">+</x-button>
  </example-row>
  <example-row title="Radio">
    <x-radio v-model:checked="radio.checked">Label</x-radio>
    <x-radio-group v-model:value="radio.value" disabled :options="radio.options" />
    <x-radio-group v-model:value="radio.value" :options="radio.options" inline />
  </example-row>
  <example-row title="Checkbox">
    <x-checkbox v-model:checked="checkbox.checked" :indeterminate="checkbox.indeterminate">Label</x-checkbox>
    <x-button @click="checkbox.indeterminate = !checkbox.indeterminate">indeterminate</x-button>
  </example-row>
  <example-row title="ProgressLinear">
    <x-progress-linear :value="pgslin.value" :buffer-value="pgslin.buffer" stream :indeterminate="pgslin.indeterminate" />
    <div>
      <x-button circle @click="pgslin.value -= 10">-</x-button>
      <span>value: {{ pgslin.value }}</span>
      <x-button circle @click="pgslin.value += 10">+</x-button>

      <x-button circle @click="pgslin.buffer -= 10">-</x-button>
      <span>buffer-value: {{ pgslin.buffer }}</span>
      <x-button circle @click="pgslin.buffer += 10">+</x-button>
      <x-checkbox v-model:checked="pgslin.indeterminate">indeterminate</x-checkbox>
    </div>
  </example-row>
  <example-row title="Switch">
    <x-switch v-model:value="swi.value" />
    <x-switch v-model:value="swi.value" inset />
  </example-row>
  <example-row title="OldSlider">
    <x-old-slider v-model:value="slider.value"></x-old-slider>
    <x-old-slider v-model:value="slider.range" range></x-old-slider>
  </example-row>
  <example-row title="Slider">
    <x-slider v-model:value="slider.value" >
      <template #thumb-label="{ value, type }">
        <span>h{{ value }}+{{ type }}</span>
      </template>
    </x-slider>
    <x-slider v-model:value="slider.range" range>
      <template #thumb-label="{ value, type }">
        <span>h{{ value }}+{{ type }}</span>
      </template>
    </x-slider>
  </example-row>
  <example-row title="DatePicker">
    <div>
      <x-checkbox v-model:checked="datpic.landscape">Landscape</x-checkbox>
      <x-checkbox v-model:checked="datpic.rounded">Rounded</x-checkbox>
    </div>

    <div>
      <x-date-picker v-model:value="datpic.value" :landscape="datpic.landscape" :rounded="datpic.rounded" />
      <x-date-picker v-model:value="datpic.range" range :landscape="datpic.landscape" :rounded="datpic.rounded" />
      <x-date-picker v-model:value="datpic.multi" multiple :landscape="datpic.landscape" :rounded="datpic.rounded" />
    </div>

    <div>
      <x-date-picker v-model:value="datpic.value" desktop :landscape="datpic.landscape" :rounded="datpic.rounded" />
      <x-date-picker v-model:value="datpic.range" desktop range :landscape="datpic.landscape" :rounded="datpic.rounded" />
      <x-date-picker v-model:value="datpic.multi" desktop multiple :landscape="datpic.landscape" :rounded="datpic.rounded" />
    </div>
  </example-row>
  <example-row title="Tabs, Tab">
    <x-tabs v-model:value="tab.value" :show-arrows="tab.arrows" :centered="tab.centered" :fixed="tab.fixed" >
      <x-tab v-for="idx in tab.num" :key="idx" :name="idx">item {{idx}}</x-tab>
    </x-tabs>
    <x-button @click="tab.num++">add</x-button>
    <x-button @click="tab.num--">remove</x-button>
    <x-button @click="() => { tab.value = ++tab.num }">add & active</x-button>
    <x-button @click="() => { tab.value = --tab.num }">remove & active</x-button>
    <x-checkbox v-model:checked="tab.arrows">show-arrows</x-checkbox>
    <x-checkbox v-model:checked="tab.centered">centered</x-checkbox>
    <x-checkbox v-model:checked="tab.fixed">fixed</x-checkbox>
  </example-row>
  <example-row title="Dialog">
    <x-button @click="() => dialog.value = !dialog.value">trigger dialog</x-button>
    <x-checkbox v-model:checked="dialog.title">title</x-checkbox>
    <x-checkbox v-model:checked="dialog.modal">modal</x-checkbox>
    <x-checkbox v-model:checked="dialog.persistent">persistent</x-checkbox>
    <x-dialog
      v-model:value="dialog.value"
      width="50%"
      :title="dialog.title ? 'title' : ''"
      :modal="dialog.modal"
      :persistent="dialog.persistent"
    >
      <div style="height: 300px; overflow-y: auto;">
        <div v-for="num in 40">data: {{  num  }}</div>
      </div>
      <template #footer>
        <x-button @click="() => dialog.value = false">cancel</x-button>
        <x-button @click="() => dialog.value = false">confirm</x-button>
      </template>
    </x-dialog>
  </example-row>
  <example-row title="Chip">
    <x-chip
      :prepend-icon="chip.prepend ? 'account-circle-outline' : ''"
      :append-icon="chip.append ? 'account-circle-outline' : ''"
      :closable="chip.close"
      :type="chip.type">Chip</x-chip>
    <x-checkbox v-model:checked="chip.prepend">prepend</x-checkbox>
    <x-checkbox v-model:checked="chip.append">append</x-checkbox>
    <x-checkbox v-model:checked="chip.close">close</x-checkbox>

    <x-radio-group v-model:value="chip.type" inline>
      <x-radio value="tonal">tonal</x-radio>
      <x-radio value="elevated">elevated</x-radio>
      <x-radio value="outlined">outlined</x-radio>
      <x-radio value="text">text</x-radio>
    </x-radio-group>
  </example-row>
  <example-row title="Table">
    <x-checkbox v-model:checked="table.fixed">column-fixed</x-checkbox>
    <x-checkbox v-model:checked="table.loading">loading</x-checkbox>
    <x-checkbox v-model:checked="table.showdata">show data</x-checkbox>
    <x-checkbox v-model:checked="table.border">show border</x-checkbox>
    
    <div>Fixed FixedHeader</div>
    <div class="resize">
      <x-table fixed-header :data="table.showdata ? table.data : []" :loading="table.loading" :border="table.border">
        <x-table-column type="expand">
          (expand)
        </x-table-column>
        <x-table-column label="propa" prop="a" width="120px" :fixed="table.fixed" sorter />
        <x-table-column label="propb" prop="b" width="100px" />
        <x-table-column label="propc" prop="c" filters filter :sorter="table.onSorter" />
        <x-table-column label="propd" prop="d" min-width="200px" ellipsis fixed="right" />
        <x-table-column label="prope" prop="e" min-width="100px" max-width="200px" >
          <template #header="column">
            <span>custom header {{ column.label }}</span>
          </template>
          <template #default="{ source }">
            <span class="ellipsis">custom value {{ source.e }}</span>
          </template>
        </x-table-column>
        <template #header.name="column">
          <div>custom header: {{ column.label }}</div>
        </template>
      </x-table>
    </div>

    <div>Auto FixedHeader</div>
    <div class="resize">
      <x-table fixed-header layout="auto" :data="table.showdata ? table.data : []" :loading="table.loading" :border="table.border">
        <x-table-column label="propa" prop="a" width="120px" fixed/>
        <x-table-column label="propb" prop="b" width="100px" />
        <x-table-column label="propc" prop="c" />
        <x-table-column label="propd" prop="d" min-width="200px" ellipsis fixed="right" />
        <x-table-column label="prope" prop="e" min-width="100px" max-width="200px" ellipsis >
          <template #default="{ source }">
            <span class="ellipsis">custom value: {{ source.e }}</span>
          </template>
        </x-table-column>
      </x-table>
    </div>

    <div>Fixed</div>
    <div class="resize">
      <x-table :data="table.showdata ? table.data : []" :loading="table.loading" :border="table.border">
        <x-table-column label="propa" prop="a" width="120px" fixed/>
        <x-table-column label="propb" prop="b" width="100px" />
        <x-table-column label="propc" prop="c" />
        <x-table-column label="propd" prop="d" min-width="200px" ellipsis fixed="right" />
        <x-table-column label="prope" prop="e" min-width="100px" max-width="200px" ellipsis >
          <template #default="{ source }">
            <span>custom value: {{ source.e }}</span>
          </template>
        </x-table-column>
      </x-table>
    </div>

    <div>Auto</div>
    <div class="resize">
      <x-table layout="auto" :data="table.showdata ? table.data : []" :loading="table.loading" :border="table.border">
        <x-table-column label="propa" prop="a" width="120px" fixed/>
        <x-table-column label="propbb" prop="b" width="100px" />
        <x-table-column label="propccc" prop="c" />
        <x-table-column label="propdddd" prop="d" min-width="200px" ellipsis fixed="right" />
        <x-table-column label="propeeeee" prop="e" min-width="100px"  max-width="200px" ellipsis >
          <template #default="{ source }">
            <span>custom value: {{ source }}</span>
          </template>
        </x-table-column>
      </x-table>
    </div>
  </example-row>
  <example-row title="Card">
    <div>
      <x-checkbox v-model:checked="card.expand">Expand</x-checkbox>
      <x-checkbox v-model:checked="card.loading">Loading</x-checkbox>

      <x-radio-group v-model:value="card.type" inline>
        <x-radio value="elevated">Elevated</x-radio>
        <x-radio value="tonal">Tonal</x-radio>
        <x-radio value="outlined">Outlined</x-radio>
        <x-radio value="flat">Flat</x-radio>
      </x-radio-group>
    </div>

    <x-card :type="card.type" title="Title" class="text-blue-8" subtitle="Subtitle" :expand="card.expand" :loading="card.loading">
      <template #default>
        <div>Content</div>
      </template>
      <template #footer>
        <x-button>Button</x-button>
      </template>
    </x-card>

    <x-card :type="card.type" width="200px" :expand="card.expand" hover :loading="card.loading">
      <template #default>
        <div>Content</div>
      </template>
      <template #footer>
        <x-button>Button</x-button>
      </template>
    </x-card>

    <x-card :type="card.type" width="200px" :expand="card.expand" :loading="card.loading">
      <template #media>
        <img src="https://i.travelapi.com/hotels/4000000/3060000/3050100/3050071/c14f03db_b.jpg" />
      </template>
      <template #default>
        <div>Content</div>
      </template>
      <template #footer>
        <x-button>Button</x-button>
      </template>
    </x-card>
  </example-row>
</template>

<script>
import { ref } from 'vue'
import ExampleRow from './ExampleRow.vue'
import { reactive } from 'vue'

function useIcon() {
  return {}
}

function useButton () {
  return {}
}

function useInput (){
  const variant = ref('underlined')
  const icon = ref(false)
  const loading = ref(false)
  const disabled = ref(false)
  const clearable = ref(false)

  return { variant, icon, loading, disabled, clearable }
}

function useTextField() {
  const value = ref('')
  return { value }
}

function useTextarea() {
  const value = ref('')
  return { value }
}

function useSelect() {
  const value = ref()
  const query = ref('')
  const options = ref([
    { label: 'AA', value: 1 },
    { label: 'BB', value: 2 },
    { label: 'CC', value: 3 },
    { label: 'DD', value: 4 },
    { label: 'EE', value: 5 },
    { label: 'FF', value: 6 },
    { label: 'GG', value: 7 },
    { label: 'HH', value: 8 },
    { label: 'JJ', value: 9 },
  ])
  return { value, query, options }
}

function usePgsCir() {
  const value = ref(50)
  const indeterminate = ref(true)
  return { value, indeterminate }
}

function useRadio() {
  const value = ref()
  const checked = ref(false)
  const options = ref([
    { label: 'Label1', value: 1 },
    { label: 'Label2', value: 2 },
    { label: 'Label3', value: 3 },
  ])
  return { value, checked, options }
}

function useCheckbox() {
  const checked = ref(false)
  const indeterminate = ref(true)
  return { checked, indeterminate }
}

function usePgsLin() {
  const value = ref(20)
  const buffer = ref(80)
  const indeterminate = ref(true)
  return { value, buffer, indeterminate }
}

function useSwitch() {
  const value = ref(false)
  return { value }
}

function useSlider() {
  const value = ref(0)
  const range = ref([20, 50])
  return { value, range }
}

function useDatPic() {
  const value = ref('2021-06-14')
  const range = ref([])
  const multi = ref(['2021-06-14'])
  const landscape = ref(false)
  const rounded = ref(false)
  return { value, range, multi, landscape, rounded }
}

function useTab() {
  const value = ref()
  const num = ref(10)
  const arrows = ref(false)
  const centered = ref(false)
  const fixed = ref(false)
  return { value, num, arrows, centered, fixed }
}

function useDialog() {
  const value = ref(false)
  const title = ref(true)
  const modal = ref(true)
  const persistent = ref(true)
  return { value, title, modal, persistent }
}

function useChip() {
  const prepend = ref(false)
  const append = ref(false)
  const close = ref(false)
  const type = ref('tonal')
  return { prepend, append, close, type }
}

function useTable() {
  const showdata = ref(false)
  const data = ref([
    { a: 3, b: 'value b', c: 'value c', d: 'value d value d value d value d value d value d value d value d value d' },
    { a: 2, b: 'value b', c: 'value cc', d: 'value d' },
    { a: 3, b: 'value b', c: 'value c', d: 'value d' },
    { a: 5, b: 'value b', c: 'value ccc', d: 'value d' },
    { a: 2, b: 'value b', c: 'value cc1', d: 'value d' },
  ])
  const border = ref(false)
  const loading = ref(false)
  const fixed = ref(true)

  const onSorter = (a, b) => a.c.length - b.c.length

  setTimeout(() => {
    data.value.push({ a: 1, b: 'value b', c: 'value c', d: 'value d' })
  }, 2000)

  return { showdata, data, border, loading, fixed, onSorter }
}

function useCard() {
  const type = ref('elevated')
  const expand = ref(false)
  const loading = ref(false)
  return { type, expand, loading }
}

export default {
  // https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#caveat-when-unwrapping-in-templates

  components: { ExampleRow },

  setup() {
    return {
      icon: reactive(useIcon()),
      button: reactive(useButton()),
      input: reactive(useInput()),
      textfield: reactive(useTextField()),
      textarea: reactive(useTextarea()),
      select: reactive(useSelect()),
      pgscir: reactive(usePgsCir()),
      radio: reactive(useRadio()),
      checkbox: reactive(useCheckbox()),
      pgslin: reactive(usePgsLin()),
      swi: reactive(useSwitch()), // switch x
      slider: reactive(useSlider()),
      datpic: reactive(useDatPic()),
      tab: reactive(useTab()),
      dialog: reactive(useDialog()),
      chip: reactive(useChip()),
      table: reactive(useTable()),
      card: reactive(useCard()),
    }
  }
}
</script>

<style lang="scss">
body {
  min-height: 1500px;
}

.resize {
  resize: auto;
  overflow: hidden;
}
</style>