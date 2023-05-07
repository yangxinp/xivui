import Vue, { App } from 'vue'
import Button from './Button'
import Input from './Input' 
import TextField from './TextField'
import ProgressCircular from './ProgressCircular'
import Icon from './Icon'
import Radio from './Radio'
import Checkbox from './Checkbox'
import ProgressLinear from './ProgressLinear'
import Switch from './Switch'
import OldSlider from './OldSlider'
import Slider from './Slider'
import DatePicker from './DatePicker'
import { Tabs, Tab } from './Tabs'
import Dialog from "./Dialog"

const components = [
  Button,
  Input,
  TextField,
  ProgressCircular,
  Icon,
  Radio,
  Checkbox,
  ProgressLinear,
  Switch,
  OldSlider,
  Slider,
  DatePicker,
  Tabs,
  Tab,
  Dialog,
]

const install = function (app: App) {
  console.log('ui install!')
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export {
  install,
  Button,
  Input,
  TextField,
  ProgressCircular,
  Icon,
  Radio,
  Checkbox,
  ProgressLinear,
  Switch,
  OldSlider,
  Slider,
  DatePicker,
  Tabs,
  Tab,
  Dialog
}