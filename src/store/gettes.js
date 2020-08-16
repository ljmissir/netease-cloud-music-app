import state from "./state";

export const user = (state) => state.user;

export const curSong = (state) => state.curSong;

export const recommendCoverImg = (state) => {
  return !!state.recommendCover.length ? state.recommendCover[0].pic : "";
};

export const curPlayList = (state) => state.curPalyList;
