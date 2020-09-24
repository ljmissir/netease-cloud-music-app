<template>
  <div>
    <Cover :coverInfo="coverInfo" />
    <Songs :songs="songs" />
  </div>
</template>

<script>
import request from "@/services";
import Cover from "./components/cover";
import Songs from "./components/songs";
const { reactive, toRefs, onMounted } = require("vue");
const { useRoute } = require("vue-router");

export default {
  components: {
    Cover,
    Songs,
  },
  setup() {
    const state = reactive({
      coverInfo: {},
      songs: [],
    });

    const route = useRoute();

    const { id } = route.params;

    // 获取歌单详情
    const queryPlayListDetail = async () => {
      const result = await request.queryPlayListDetail({ id });
      const ids = result.playlist.trackIds.map(item => item.id).join(",");
      const { coverImgUrl, name, description } = result.playlist;
      const { backgroundUrl, nickname, avatarUrl } = result.playlist.creator;
      state.coverInfo = {
        coverImgUrl,
        name,
        description: description ? description.slice(0, 30) : "暂无简介",
        backgroundUrl,
        nickname,
        avatarUrl,
      };
      await querySongDetail(ids);
    };

    // 获取歌单所有歌曲
    const querySongDetail = async ids => {
      const result = await request.querySongDetail({ ids });
      state.songs = result.songs;
    };

    onMounted(() => {
      queryPlayListDetail();
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
</style>