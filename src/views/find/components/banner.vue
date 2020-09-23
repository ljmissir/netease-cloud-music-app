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
    VanSwipeItem: SwipeItem,
  },
  setup() {
    const state = reactive({
      bannerList: [],
    });

    onMounted(() => {
      queryBannerList();
    });

    const queryBannerList = async () => {
      const result = await request.queryBannerList({ type: 2 });
      state.bannerList = result.banners;
    };

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.swipe-wrapper {
  width: 90%;
  position: absolute;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);

  .my-swipe {
    height: 270px;

    img {
      border-radius: 16px;
      width: 100%;
    }
  }
}
</style>
