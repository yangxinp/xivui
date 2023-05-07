// 打包入口
import '../src/components/style'
import { install } from '../src/components'

// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }

export {
  install
}
export default {
  version: "1.0.0",
  install
}