import { createApp } from "vue";
import App from "./App.vue";

// // -- lib
// import '../lib/components/styles'
// import { install } from '../lib/components/index'

// // -- es
// import '../es/components/styles'
// import { install } from '../es/components/index'

// -- src
import "../src/components/styles";
import { install } from "../src/components";

createApp(App).use(install).mount("#app");
