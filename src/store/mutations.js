import { curSong } from "./getters";
import * as types from "./mutation-types";

const mutations = {
  [types.SET_BASE_PARAMS](state, baseParams) {
    state.baseParams = baseParams;
  },
  [types.SET_USER](state, user) {
    state.user = user;
  },
  [types.SET_PLAY_LIST](state, playList) {
    state.playList = playList;
  },
  [types.SET_CUR_SONG](state, curSong) {
    state.curSong = curSong;
  },
  [types.SET_CUR_INDEX](state, curIndex) {
    state.curIndex = curIndex;
  },
};

export default mutations;
