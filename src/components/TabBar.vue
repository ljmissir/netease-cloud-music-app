<template>
  <van-tabbar
    active-color='red'
    v-model="active"
  >
    <van-tabbar-item
      v-for="tab in tabBar"
      :key="tab.path"
      @click="toggle(tab.path)"
    >
      <div class="icon-wrapper">
        <span
          class="iconfont"
          :class="'icon-' + tab.icon"
        ></span>
          <p>{{tab.title}}</p>
      </div>
      </van-tabbar-item>
      </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
const { reactive, toRefs } = require("vue");
const { useRouter } = require("vue-router");

export default {
  components: {
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem,
  },
  setup() {
    const state = reactive({
      active: 0,
      tabBar: [
        { title: "发现", path: "/find", icon: "netease" },
        { title: "视频", path: "/video", icon: "video" },
        { title: "我的", path: "/user", icon: "music" },
        { title: "云村", path: "/cloud", icon: "qunliao" },
        { title: "账号", path: "/account", icon: "zhanghao" },
      ],
    });

    const router = useRouter();

    const toggle = path => router.push(path);

    return {
      ...toRefs(state),
      toggle,
    };
  },
};
</script>

<style lang="scss" scoped>
.van-tabbar {
  .icon-wrapper {
    text-align: center;
    .iconfont {
      font-size: 30px;
    }
    p {
      margin-top: 8px;
    }
  }
}
</style>