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
      <router-link v-for="item in tabList" :key="item.title" :to="item.url">
        <div class="svg-wrpper">
          <svg-icon :iconClass="item.svgName" />
        </div>
        <div class="name">{{ item.title }}</div>
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
      tabList: [
        { title: "每日推荐", svgName: "date", url: "/recommend" },
        { title: "歌单", svgName: "songs", url: "/songSquare" },
        { title: "排行榜", svgName: "top", url: "/topList" },
        { title: "电台", svgName: "diantai", url: "/radio" },
        { title: "私人FM", svgName: "diantai", url: "/privateFm" },
      ],
    };
  },
  created() {
    this.queryBannerList();
    this.queryTopList();
  },
  methods: {
    ...mapMutations({
      setRecommendCover: "SET_RECOMMEND_COVER",
    }),
    // 获取banner轮播图数据
    queryBannerList() {
      request.queryBannerList({ type: 2 }).then((res) => {
        console.log(res, 123);
        this.bannerList = res.banners;
        this.setRecommendCover(this.bannerList);
      });
    },
    // 排行榜
    queryTopList() {
      request.queryTopList().then((res) => {
        console.log("排行榜", res);
      });
    },
  },
};
</script>

<style lang="stylus">
.find-wrapper /deep/ .van-search__content
  background rgb(201,84,74)
  opacity .6
.find-wrapper /deep/ input
  color #fff
.find-wrapper
  height 100%
  position relative
  .header
    background #C20C0C
    height 180px
    .van-search
      background #C20C0C
  .swipe-wrapper
    width 90%
    position absolute
    top 130px
    left 50%
    transform translateX(-50%)
    .my-swipe
      height 270px
      border-radius 8px
      img
        width 100%
  .suggest-wrapper
    padding-top 240px
    display flex
    align-items center
    justify-content space-around
    .svg-wrpper
      width 70px
      height 70px
      border-radius 50%
      background #C20C0C
      display flex
      align-items center
      justify-content center
      margin 0 auto
      svg
        color #fff
    .name
      text-align center
      padding-top 16px
</style>
