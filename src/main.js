import Vue from "vue";
import App from "./App.vue";

// CSS
import "@/input.css";

import VueGtag from "vue-gtag";

createApp(App)
  .use(VueGtag, {
    config: { id: "G-GE514R4JPK" },
  })
  .mount("#app");

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
