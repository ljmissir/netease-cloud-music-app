import * as types from "./mutation-types";
import request from "@/services/index";
const Cookies = require("js-cookie");
import router from "@/router";

const actions = {
  // 设置用户信息
  async setCurUser({ commit }, data) {
    const result = await request.login(data);
    console.log(result, 123);
    Cookies.set("cookie", result.cookie);
    router.push("/find");
    commit(types.SET_USER, result);
  },
  // 设置当前播放歌曲
  async setCurSongUrl({ commit }, curSongId) {
    const result = await request.querySongUrl(curSongId);
    commit(types.SET_CUR_SONG, result.data[0].url);
  },
};

export default actions;
