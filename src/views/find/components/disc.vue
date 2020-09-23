<template>
  <div class="disc-wrapper">
    <router-link
      class="disc-item"
      v-for="item in disc"
      :key="item.id"
      :to="`/playListDetail/${item.id}`"
    >
      <div className="img-wrapper">
        <img :src="item.picUrl" />
      </div>
      <p className="name">{{ item.name }}</p>
    </router-link>
  </div>
</template>

<script>
import request from "@/services";
const { reactive, toRefs, onMounted } = require("vue");

export default {
  components: {},
  setup() {
    const state = reactive({
      disc: [],
    });

    onMounted(() => {
      queryRecommendList();
    });

    const queryRecommendList = async () => {
      const result = await request.queryRecommend();
      state.disc = result.recommend;
    };

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.disc-wrapper {
  padding: 40px 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .disc-item {
    width: 30%;
    margin-bottom: 30px;
    margin-right: 34px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .img-wrapper {
      min-height: 178px;
      img {
        border-radius: 10px;
        width: 100%;
      }
    }
    .name {
      padding-top: 20px;
    }
  }
}
</style>
