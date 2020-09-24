<template>
  <div class="header">
    <van-search v-model="hotSearch" @focus="search" />
  </div>
</template>

<script>
import { Search } from "vant";
import request from "@/services";
const { reactive, toRefs, onMounted } = require("vue");
const { useRouter } = require("vue-router");

export default {
  components: { VanSearch: Search },
  setup() {
    const state = reactive({
      hotSearch: "",
    });

    const router = useRouter();

    onMounted(() => {
      queryHotSearchKey();
    });

    const search = () => {
      router.push("/search");
    };

    // 获取热搜关键字
    const queryHotSearchKey = async () => {
      const result = await request.queryDefaultHotSearchKey();
      state.hotSearch = result.data.showKeyword;
    };

    return {
      ...toRefs(state),
      search,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  background: #ca3e2f;
  height: 180px;

  .van-search {
    background: #ca3e2f;
  }
}
</style>
