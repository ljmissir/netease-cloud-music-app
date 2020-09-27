import { get } from "@/utils/request";

export const queryUserPlayList = (params) => {
  return get("/user/playlist", params);
};

// 我喜欢的音乐
export const queryMyLikeList = (params) => {
  return get("/likelist", params);
};

// 获取用户详情
export const queryUserDetail = (params) => {
  return get("/user/detail", params);
};

// 获取用户电台
export const queryUserDj = (params) => {
  return get("/user/dj", params);
};

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const queryUserSubcount = (params) => {
  return get("/user/subcount", params);
};
