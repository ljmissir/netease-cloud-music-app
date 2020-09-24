import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";
import "./style/normalize.scss";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");