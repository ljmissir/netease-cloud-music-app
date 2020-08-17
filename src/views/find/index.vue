<template>
  <div class="find-wrapper">
    <div class="header">
      <van-search />
    </div>
    <div class="swipe-wrapper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="bannerItem in bannerList" :key="bannerItem.id">
          <img v-lazy="bannerItem.pic" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="suggest-wrapper">
      <router-link v-for="item in tabList" :key="item.iconUrl" :to="formatRouterLink(item)">
        <div class="svg-wrpper">
          <span v-if="item.name==='每日推荐'">{{currentDate}}</span>
          <img v-lazy="item.iconUrl" />
        </div>
        <div class="name">{{ item.name }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import request from "@/services/index";
import { Swipe, SwipeItem, Search, Tabs, Tab } from "vant";
import { mapMutations } from "vuex";

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(Tabs);
Vue.use(Tab);

export default {
  data() {
    return {
      bannerList: [],
      tabList: [],
      currentDate: null,
    };
  },
  created() {
    this.queryBannerList();
    this.queryTopList();
    this.queryHomePageBall();
    this.queryHomePageAlbum();
    this.getCurrentDate();
  },
  methods: {
    ...mapMutations({
      setRecommendCover: "SET_RECOMMEND_COVER",
    }),
    // 获取当前日期
    getCurrentDate() {
      let date = new Date().getDate();
      date = date < 10 ? "0" + date : date;
      this.currentDate = date;
    },
    // 获取banner轮播图数据
    queryBannerList() {
      request.queryBannerList({ type: 2 }).then(res => {
        console.log(res, 123);
        this.bannerList = res.banners;
        this.setRecommendCover(this.bannerList);
      });
    },
    // 排行榜
    queryTopList() {
      request.queryTopList().then(res => {
        console.log("排行榜", res);
      });
    },
    // 获取圆形图标入口列表
    queryHomePageBall() {
      request.queryHomePageBall().then(res => {
        console.log(res, 123);
        this.tabList = res.data.splice(0, 5);
      });
    },
    // 获取新碟数据
    queryHomePageAlbum() {
      request.queryHomePageAlbum().then(res => {
        console.log(876);
      });
    },
    // 格式化路由url
    formatRouterLink(item) {
      return item.url.replace(/orpheus:\//, "");
    },
  },
};
</script>

<style lang="stylus">
.find-wrapper /deep/ .van-search__content {
  background: rgb(201, 84, 74);
  opacity: 0.6;
}

.find-wrapper /deep/ input {
  color: #fff;
}

.find-wrapper {
  height: 100%;
  position: relative;

  .header {
    background: #C20C0C;
    height: 180px;

    .van-search {
      background: #C20C0C;
    }
  }

  .swipe-wrapper {
    width: 90%;
    position: absolute;
    top: 130px;
    left: 50%;
    transform: translateX(-50%);

    .my-swipe {
      height: 270px;
      border-radius: 8px;

      img {
        width: 100%;
      }
    }
  }

  .suggest-wrapper {
    padding-top: 240px;
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
}
</style>
