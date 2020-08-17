import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";
import { Lazyload } from "vant";
import AppPlugin from "./plugins/index";
import "@/icons";

Vue.config.productionTip = false;

Vue.use(Lazyload, {
  error: require("@/assets/images/timg.jpg"),
  loading: require("@/assets/images/timg.jpg"),
});

Vue.use(AppPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
