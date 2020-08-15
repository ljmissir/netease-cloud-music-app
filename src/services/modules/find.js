import { get } from "../request";

// 获取banner
export const queryBannerList = (params) => {
  return get("/banner", params);
};

// 每日推荐歌单
export const queryRecommend = (params) => {
  return get("/recommend/resource", params);
};

// 每日推荐歌曲
export const queryRecommendSong = (params) => {
  return get("/recommend/songs", params);
};

// 排行榜
export const queryTopList = (params) => {
  return get("/toplist", params);
};
