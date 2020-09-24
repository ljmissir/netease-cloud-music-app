<template>
  <div class="player-wrapper">
    <audio
      :src="curSongUrl"
      autoplay
      class="audio"
      @ended="ended"
      @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script>
const { reactive, toRefs, watchEffect } = require("vue");
const { useStore } = require("vuex");

export default {
  setup() {
    const state = reactive({
      count: 0,
      curSongUrl: "",
    });

    const store = useStore();

    let { curIndex, playList } = store.getters;

    const setCurIndex = (curIndex) => {
      store.commit("SET_CUR_INDEX", curIndex);
    };

    const updateTime = (e) => {
      const time = e.target.currentTime;
    };

    const ended = () => {
      console.log("播放完成");
      next();
    };

    const next = () => {
      // let { curIndex } = store.getters;
      curIndex += 1;
      if (curIndex === playList.value.length) {
        curIndex = 0;
      }
      setCurIndex(curIndex);
    };

    // 根据歌曲id拼接歌曲播放url
    watchEffect(() => {
      const domain = `https://music.163.com/song/media/outer/url?`;
      state.curSongUrl = domain + `id=${store.getters.curSong.id}`;
    });

    return {
      ended,
      updateTime,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.player-wrapper {
  .audio {
    display: none;
  }
}
</style>
