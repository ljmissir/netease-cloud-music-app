<template>
  <div class="recommend-wrapper">
    <Songs :songs="songs" />
  </div>
</template>

<script>
import request from "@/services";
import Songs from "@/components/SongList";
const { reactive, toRefs, onMounted } = require("vue");

export default {
  components: {
    Songs,
  },
  setup() {
    const state = reactive({
      songs: [],
    });

    onMounted(() => {
      queryRecommend();
    });

    const queryRecommend = async () => {
      const result = await request.queryRecommendSong();
      state.songs = result.data.dailySongs;
    };

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.recommend-wrapper {
}
</style>
