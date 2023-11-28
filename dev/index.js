import { createApp } from "vue";
import App from "./App.vue";

import '@mdi/font/css/materialdesignicons.min.css'

// // -- lib
// import "../lib/components/styles";
// import xivui from "../es/index";

// // -- es
// import "../es/components/styles";
// import xivui from "../es/index";

// -- src
import "../src/components/styles";
import xivui from "../src/index";

createApp(App).use(xivui).mount("#app");
