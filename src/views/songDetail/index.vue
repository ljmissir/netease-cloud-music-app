<template>
  <div>
    <Songs :songs="songs" :showAvatar="false" />
  </div>
</template>

<script>
import request from "@/services";
import Songs from "@/components/SongList";
const { reactive, toRefs, onMounted } = require("vue");
const { useRoute } = require("vue-router");

export default {
  components: {
    Songs,
  },
  setup() {
    const state = reactive({
      songs: [],
    });

    const route = useRoute();

    const { id } = route.params;
    console.log(id, 999);

    const querySongList = async () => {
      const result = await request.querySongBySingerId({ id });
      console.log(result);
      state.songs = result.songs;
    };

    onMounted(() => {
      querySongList();
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
