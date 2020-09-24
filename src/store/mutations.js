import * as types from "./mutation-types";

const mutations = {
  [types.SET_BASE_PARAMS](state, baseParams) {
    state.baseParams = baseParams;
  },
  [types.SET_USER](state, user) {
    state.user = user;
  },
};

export default mutations;
