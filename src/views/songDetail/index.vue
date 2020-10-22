<template>
  <ListView
    :listData="songs"
    :isSong="true"
    :showAvatar="false"
    @toDetail="querySong"
  />
</template>

<script>
import request from "@/services";
import ListView from "@/components/ListView";
const { reactive, toRefs, onMounted } = require("vue");
const { useRoute } = require("vue-router");
const { useStore } = require("vuex");

export default {
  components: {
    ListView,
  },
  setup() {
    const state = reactive({
      songs: [],
    });

    const route = useRoute();

    const store = useStore();

    const { id } = route.params;

    const querySongList = async () => {
      const result = await request.querySongBySingerId({ id, limit: 150 });
      state.songs = result.songs;
    };

    const querySong = async (song) => {
      const { id } = song;
      const { songs } = state;
      const setPlayList = () => store.dispatch("setPlayList", { songs, id });
      await setPlayList();
    };

    onMounted(() => {
      querySongList();
    });

    return {
      ...toRefs(state),
      querySong,
    };
  },
};
</script>

<style lang="scss" scoped></style>
