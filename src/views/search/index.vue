<template>
  <div class="search-wrapper">
    <van-search v-model="hotSearch" />
    <div class="hots-list">
      <div
        class="hots-item"
        v-for="(item, index) in hots"
        :key="item.content"
      >
        <span
          class="num"
          :class="formatClass(index)"
        >{{index + 1}}</span>
          <div class="info">
            <p class="search-word">
              <span class="search">{{item.searchWord}}</span>
              <img
                :src="item.iconUrl"
                alt=""
              />
            </p>
            <p class="content">{{item.content}}</p>
          </div>
    </div>
  </div>
  </div>
</template>

<script>
import request from "@/services";
import { Search } from "vant";
const { reactive, toRefs, onMounted } = require("vue");

export default {
  components: {
    VanSearch: Search,
  },
  setup() {
    const state = reactive({
      hotSearch: "",
      hots: [],
    });

    const queryHotSearchDetail = async () => {
      const result = await request.queryHotSearchDetail();
      state.hots = result.data;
    };

    // 获取热搜关键字
    const queryHotSearchKey = async () => {
      const result = await request.queryDefaultHotSearchKey();
      state.hotSearch = result.data.showKeyword;
    };

    const formatClass = index => (index < 4 ? "hot" : "");

    onMounted(() => {
      queryHotSearchDetail();
      queryHotSearchKey();
    });

    return {
      ...toRefs(state),
      formatClass,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  padding: 30px 20px;
  .hots-list {
    padding: 40px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .hots-item {
      width: 45%;
      display: flex;
      align-items: center;
      padding-bottom: 30px;
      &:nth-child(2n) {
        margin-right: 20px;
      }
      .num {
        padding-right: 10px;
        &.hot {
          color: red;
        }
      }
      .info {
        padding-left: 10px;
        .search-word {
          padding-bottom: 10px;
          font-size: 28px;
          display: flex;
          align-items: center;
          img {
            width: 32px;
            margin-left: 10px;
          }
        }
        .content {
          font-size: 24px;
          color: rgb(154, 154, 154);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 310px;
        }
      }
    }
  }
}
</style>