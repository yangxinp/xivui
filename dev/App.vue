<template>
  <example-row title="Icon">
    <x-icon type="account-circle"></x-icon>
    <x-icon type="account-circle-outline"></x-icon>
  </example-row>
  <example-row title="Button">
    <!-- 大小 -->
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
    <!-- 加载 -->
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
    <!-- 圆形 -->
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
    <!-- 其他 -->
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
    <!-- 颜色 -->
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
    <x-input></x-input>
  </example-row>
  <example-row title="TextField">
    <x-text-field></x-text-field>
  </example-row>
  <example-row title="ProgressCircular">
    <x-progress-circular :indeterminate="indeterminate" :value="cprogress" :size="32"></x-progress-circular>
    <x-progress-circular :indeterminate="indeterminate" :value="cprogress"></x-progress-circular>
    <x-progress-circular :value="cprogress"></x-progress-circular>
    <x-button circle @click="cprogress -= 10">-</x-button>
    <span>value: {{ cprogress }}</span>
    <x-button circle @click="cprogress += 10">+</x-button>
  </example-row>
  <example-row title="Radio">
    <x-radio></x-radio>
  </example-row>
  <example-row title="Checkbox">
    <x-checkbox v-model:value="checkbox" :indeterminate="checkboxIndeterminate" @click="handleClick">Label</x-checkbox>
    <x-button @click="checkboxIndeterminate = !checkboxIndeterminate">indeterminate</x-button>
  </example-row>
  <example-row title="ProgressLinear">
    <x-progress-linear :value="progress" :buffer-value="progressBuffer" stream :indeterminate="progressIndeterminate"></x-progress-linear>
    <div>
      <x-button circle @click="progress -= 10">-</x-button>
      <span>value: {{ progress }}</span>
      <x-button circle @click="progress += 10">+</x-button>
      <x-button circle @click="progressBuffer -= 10">-</x-button>
      <span>buffer-value: {{ progressBuffer }}</span>
      <x-button circle @click="progressBuffer += 10">+</x-button>
      <x-button @click="progressIndeterminate = !progressIndeterminate">indeterminate</x-button>
    </div>
  </example-row>
  <example-row title="Switch">
    <x-switch v-model:value="switchVal"></x-switch>
    <x-switch v-model:value="switchVal" inset></x-switch>
  </example-row>
  <example-row title="OldSlider">
    <x-old-slider v-model:value="sliderVal"></x-old-slider>
    <x-old-slider v-model:value="sliderRangeVal" range></x-old-slider>
  </example-row>
  <example-row title="Slider">
    <x-slider v-model:value="sliderVal" >
      <template #thumb-label="{ value, type }">
        <span>h{{ value }}+{{ type }}</span>
      </template>
    </x-slider>
    <x-slider v-model:value="sliderRangeVal" range>
      <template #thumb-label="{ value, type }">
        <span>h{{ value }}+{{ type }}</span>
      </template>
    </x-slider>
  </example-row>
  <example-row title="DatePicker">
    <x-switch v-model:value="datePickerLandscape"></x-switch><span>Landscape</span>
    <x-switch v-model:value="datePickerRounded"></x-switch><span>Rounded</span><br/>
    <x-date-picker v-model:value="dateVal" :landscape="datePickerLandscape" :rounded="datePickerRounded"></x-date-picker>
    <x-date-picker v-model:value="dateRangeVal" range :landscape="datePickerLandscape" :rounded="datePickerRounded"></x-date-picker>
    <x-date-picker v-model:value="dateMultiVal" multiple :landscape="datePickerLandscape" :rounded="datePickerRounded"></x-date-picker>
    <x-date-picker v-model:value="dateVal" desktop :landscape="datePickerLandscape" :rounded="datePickerRounded"></x-date-picker>
    <x-date-picker v-model:value="dateRangeVal" desktop range :landscape="datePickerLandscape" :rounded="datePickerRounded"></x-date-picker>
    <x-date-picker v-model:value="dateMultiVal" desktop multiple :landscape="datePickerLandscape" :rounded="datePickerRounded"></x-date-picker>
  </example-row>
  <example-row title="Tabs, Tab">
    <x-tabs v-model:value="tabVal" :show-arrows="showArrows" :centered="centered" :fixed="fixed" >
      <!-- <x-tab>123</x-tab>
      <x-tab>123</x-tab>
      <x-tab>123</x-tab> -->
      <x-tab v-for="idx in tabNum" :key="idx" :name="idx">item {{idx}}</x-tab>
    </x-tabs>
    <x-button @click="tabNum++">add</x-button>
    <x-button @click="tabNum--">remove</x-button>
    <x-button @click="() => { tabVal = ++tabNum }">add & active</x-button>
    <x-button @click="() => { tabVal = --tabNum }">remove & active</x-button>
    <x-switch v-model:value="showArrows"></x-switch><span>ShowArrows</span>
    <x-switch v-model:value="centered"></x-switch><span>centered</span>
    <x-switch v-model:value="fixed"></x-switch><span>fixed</span>
  </example-row>
  <example-row title="Dialog">
    <x-button @click="handleTriggerDialog">trigger dialog</x-button>
    <x-dialog v-model:value="dialogVal" />
  </example-row>
  <example-row title="Chip">
    <x-chip
      :prepend-icon="chipPrepend ? 'account-circle-outline' : ''"
      :append-icon="chipAppend ? 'account-circle-outline' : ''"
      :closable="chipClose"
      :type="chipType"
    >Chip</x-chip>
    <x-checkbox v-model:value="chipPrepend">prepend</x-checkbox>
    <x-checkbox v-model:value="chipAppend">append</x-checkbox>
    <x-checkbox v-model:value="chipClose">close</x-checkbox>
    <x-tabs v-model:value="chipType" centered>
      <x-tab name="tonal">tonal</x-tab>
      <x-tab name="elevated">elevated</x-tab>
      <x-tab name="outlined">outlined</x-tab>
      <x-tab name="text">text</x-tab>
    </x-tabs>
  </example-row>
</template>

<script>
import ExampleRow from './ExampleRow.vue'
export default {
  components: {
    ExampleRow
  },
  data () {
    return {
      buttonText: "haha1345",
      indeterminate: true,
      checkbox: false,
      checkboxIndeterminate: false,
      // progress-circular
      cprogress: 50,
      // progress
      progress: 20,
      progressBuffer: 80,
      progressIndeterminate: false,
      // switch
      switchVal: false,
      // slider
      sliderVal: 0,
      sliderRangeVal: [20, 50],
      // date
      dateVal: '2021-06-14',
      dateRangeVal: [],
      dateMultiVal: ['2021-06-14'],
      datePickerLandscape: false,
      datePickerRounded: false,
      // tab
      tabVal: null,
      tabNum: 10,
      showArrows: false,
      centered: false,
      fixed: false,
      // dialog
      dialogVal: false,
      // chip
      chipPrepend: false,
      chipAppend: false,
      chipClose: false,
      chipType: 'tonal',
    }
  },
  methods: {
    handleClick(e) {
      console.log('outer handleClick', e)
    },
    Mousedown() {
      console.log('Mousedown')
    },
    handleTriggerDialog() {
      this.dialogVal = !this.dialogVal
    }
  }
}
</script>

<style lang="scss" scoped>

</style>