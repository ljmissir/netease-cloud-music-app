import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import * as getters from "./gettes";

const createLogger = require("vuex/dist/logger");

const debug = process.env.NODE_ENV !== "prodution";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: debug ? [createLogger()] : [],
});
