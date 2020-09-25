<template>
  <div class="player-wrapper">
    <audio
      ref="audioRef"
      :src="curSongUrl"
      class="audio"
      autoplay
      @play="ready"
      @ended="ended"
      @error="error"
      @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script>
import request from "@/services";
const { reactive, toRefs, watchEffect, ref } = require("vue");
const { useStore } = require("vuex");

export default {
  setup() {
    const state = reactive({
      songReady: false,
      curSongUrl: "",
    });

    const audioRef = ref(null);

    console.log(audioRef, 1234);

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
      curIndex += 1;
      if (curIndex === playList.length) {
        curIndex = 0;
      }
      setCurIndex(curIndex);
    };

    const ready = () => {
      state.songReady = true;
    };

    const error = () => {};

    const querySongUrl = async (id) => {
      if (id) {
        const result = await request.querySongUrl({ id });
        console.log(result);
        state.curSongUrl = result.data[0].url;
        // audioRef.value.play();
      }
    };

    // 根据歌曲id拼接歌曲播放url
    watchEffect(() => {
      querySongUrl(store.getters.curSong.id);
      // const domain = `https://music.163.com/song/media/outer/url?`;
      // state.curSongUrl = domain + `id=${store.getters.curSong.id}`;
      // if (audioRef.value) {
      //   audioRef.value.play();
      // }
    });

    return {
      audioRef,
      ready,
      ended,
      error,
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
