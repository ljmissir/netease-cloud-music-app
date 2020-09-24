import * as types from "./mutation-types";
import request from "@/services";
import router from "@/router";
const Cookies = require("js-cookie");

export const setBaseParams = function({ commit }, data) {
  commit(types.SET_BASE_PARAMS, data);
};

export const setUser = async function({ commit }, data) {
  const result = await request.login(data);
  Cookies.set("cookie", result.cookie);
  router.push("/find");
  commit(types.SET_USER, result);
};

export const setPlayList = async function({ commit }, { songs, curSong }) {
  const curIndex = songs.value.findIndex((cur) => cur.id === curSong.id);
  commit(types.SET_CUR_INDEX, curIndex);
  // commit(types.SET_CUR_SONG, curSong);
  commit(types.SET_PLAY_LIST, songs);
};
