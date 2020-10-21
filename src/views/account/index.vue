<template>
  <list-view :listData="artists" />
</template>

<script>
import request from "@/services";
import { List, Cell } from "vant";
import ListView from "@/components/ListView";
import utils from "@/utils";
const { reactive, toRefs, onMounted } = require("vue");

export default {
  components: {
    ListView,
  },
  setup() {
    const state = reactive({
      artists: [],
    });

    const querySinger = async () => {
      const result = await request.querySingerList({ type: -1, limit: 100 });
      state.artists = result.artists;
    };

    onMounted(() => {
      querySinger();
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
