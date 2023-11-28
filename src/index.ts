import { App, Plugin } from 'vue'
import pkg from '../package.json'
import * as components from './components'
export * from './components';

const version = pkg.version

const install: Plugin = function (app: App) {
  Object.keys(components).forEach(key => {
    const component = Reflect.get(components, key);

    if (component && component.name) {
      app.component(component.name, component)
    }
  })

  console.log(`${pkg.name}@${pkg.version} installed`)
}

export { install, version };

export default {
  version,
  install,
};
