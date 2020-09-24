export const baseParams = (state) => state.baseParams;

export const user = (state) => state.user;

export const playList = (state) => state.playList;

export const curIndex = (state) => state.curIndex;

export const curSong = (state) => {
  return state.playList.length > 0 ? state.playList[state.curIndex] : {};
};
