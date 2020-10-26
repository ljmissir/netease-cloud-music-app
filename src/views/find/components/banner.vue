<template>
  <div class="swipe-wrapper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="bannerItem in bannerList" :key="bannerItem.id">
        <img :src="bannerItem.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import request from "@/services";
const { reactive, toRefs, onMounted } = require("vue");

export default {
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem
  },
  setup() {
    const state = reactive({
      bannerList: []
    });

    const queryBannerList = async () => {
      const result = await request.queryBannerList({ type: 2 });
      state.bannerList = result.banners;
    };

    onMounted(() => {
      queryBannerList();
    });

    return {
      ...toRefs(state)
    };
  }
};
</script>

<style lang="scss" scoped>
.swipe-wrapper {
  padding: 0 30px;
  position: relative;
  top: -60px;

  .my-swipe {
    height: 270px;
    border-radius: 20px;

    img {
      //   border-radius: 16px;
      width: 100%;
    }
  }
}
</style>
