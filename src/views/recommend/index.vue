<template>
  <div class="recommend-wrapper">
    <ListView
      :listData="songs"
      :isSong="true"
      :showAvatar="true"
      @toDetail="querySong"
    />
  </div>
</template>

<script>
import request from "@/services";
import ListView from "@/components/ListView";
const { reactive, toRefs, onMounted } = require("vue");
const { useStore } = require("vuex");

export default {
  components: {
    ListView
  },
  setup() {
    const state = reactive({
      songs: []
    });

    const store = useStore();

    onMounted(() => {
      queryRecommend();
    });

    const queryRecommend = async () => {
      const result = await request.queryRecommendSong();
      state.songs = result.data.dailySongs;
    };

    const querySong = async (song) => {
      const { id } = song;
      const { songs } = state;
      const setPlayList = () => store.dispatch("setPlayList", { songs, id });
      await setPlayList();
    };

    return {
      ...toRefs(state),
      querySong
    };
  }
};
</script>

<style lang="scss" scoped></style>
