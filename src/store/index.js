import { createStore } from "vuex";
import state from "./state";
import mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";

const { createLogger } = require("vuex/dist/vuex.cjs");

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  state,
  mutations,
  actions,
  getters,
  // modules: {},
  plugins: debug ? [createLogger()] : []
});
