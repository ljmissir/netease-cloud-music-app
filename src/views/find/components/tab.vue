<template>
  <div class="tab-wrapper">
    <router-link
      v-for="item in tabList"
      :key="item.iconUrl"
      :to="resolvePath(item)"
    >
      <div class="svg-wrpper">
        <span v-if="item.name === '每日推荐'">{{ currentDate }}</span>
        <img :src="item.iconUrl" />
      </div>
      <div class="name">{{ item.name }}</div>
    </router-link>
  </div>
</template>

<script>
import request from "@/services";
const { reactive, toRefs, onMounted } = require("vue");

export default {
  setup() {
    const state = reactive({
      tabList: [],
      currentDate: "",
    });

    onMounted(() => {
      queryHomePageBall();
      getCurDate();
    });

    // 获取当前日期
    const getCurDate = () => {
      let date = new Date().getDate();
      date = date < 10 ? "0" + date : date;
      state.currentDate = date;
    };

    const queryHomePageBall = async () => {
      const result = await request.queryHomePageBall();
      state.tabList = result.data.splice(0, 5);
      console.log(state.tabList, 123);
    };

    const resolvePath = (tab) => {
      const lastLine = tab.url.lastIndexOf("/");
      const path = tab.url.slice(lastLine);
      return path;
    };

    return {
      ...toRefs(state),
      resolvePath,
    };
  },
};
</script>

<style lang="scss" scoped>
.tab-wrapper {
  margin-top: -30px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .svg-wrpper {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: red;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    position: relative;

    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -40%);
      color: red;
      font-size: 12px;
    }

    img {
      color: #fff;
      width: 100%;
      border-radius: 50%;
    }
  }

  .name {
    text-align: center;
    padding-top: 16px;
  }
}
</style>
