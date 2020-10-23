<template>
  <list-view :listData="artists" @toDetail="querySongs" />
</template>

<script>
import request from "@/services";
import { List, Cell } from "vant";
import ListView from "@/components/ListView";
import utils from "@/utils";
const { reactive, toRefs, onMounted } = require("vue");
const { useRouter } = require("vue-router");

export default {
  components: {
    ListView
  },
  setup() {
    const state = reactive({
      artists: []
    });

    const router = useRouter();

    const querySinger = async () => {
      const result = await request.querySingerList({ type: -1, limit: 100 });
      state.artists = result.artists;
    };

    // 根据歌手id查询歌手的歌曲
    const querySongs = (singer) => {
      router.push(`/singer/${singer.id}`);
    };

    onMounted(() => {
      querySinger();
    });

    return {
      ...toRefs(state),
      querySongs
    };
  }
};
</script>
