import Vue, { App } from 'vue'
import Button from './Button'
import Input from './Input' 
import TextField from './TextField'
import Textarea from './Textarea'
import Select from './Select'
import ProgressCircular from './ProgressCircular'
import Icon from './Icon'
import Radio, { RadioGroup } from './Radio'
import Checkbox from './Checkbox'
import ProgressLinear from './ProgressLinear'
import Switch from './Switch'
import OldSlider from './OldSlider'
import Slider from './Slider'
import DatePicker from './DatePicker'
import { Tabs, Tab } from './Tabs'
import Dialog from "./Dialog"
import Chip from "./Chip"
import { Table, TableColumn } from './Table'

const components = [
  Button,
  Input,
  TextField,
  Textarea,
  Select,
  ProgressCircular,
  Icon,
  Radio,
  RadioGroup,
  Checkbox,
  ProgressLinear,
  Switch,
  OldSlider,
  Slider,
  DatePicker,
  Tabs,
  Tab,
  Dialog,
  Chip,
  Table,
  TableColumn,
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
  Textarea,
  Select,
  ProgressCircular,
  Icon,
  Radio,
  RadioGroup,
  Checkbox,
  ProgressLinear,
  Switch,
  OldSlider,
  Slider,
  DatePicker,
  Tabs,
  Tab,
  Dialog,
  Table,
  TableColumn,
}