import * as types from "./mutation-types";
const mutations = {
  [types.SET_USER](state, user) {
    state.user = user;
  },
  [types.SET_CUR_SONG](state, curSong) {
    state.curSong = curSong;
  },
  [types.SET_RECOMMEND_COVER](state, recommendCover) {
    state.recommendCover = recommendCover;
  },
  [types.SET_PLAY_LIST](state, curPlayList) {
    state.curPlayList = curPlayList;
  },
  [types.SET_Cur_PLAY_Index](state, curPlayingIndex) {
    state.curPlayingIndex = curPlayingIndex;
  },
};

export default mutations;
