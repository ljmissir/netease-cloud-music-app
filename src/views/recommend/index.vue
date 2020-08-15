<template>
  <div class="recommend-wrapper">
    <div class="cover" :style="getCoverBg">
      <svg-icon iconClass="left-arrow" @click="goBack" />
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="queryRecommendSong"
    >
      <div
        class="cell-item van-cell"
        v-for="item in recommendList"
        :key="item.id"
        @click="querySong(item)"
      >
        <div class="singer-info">
          <img v-lazy="item.al.picUrl" alt="" />
          <div class="info">
            <p class="song-name">{{ item.name }}</p>
            <p class="singer-name">{{ formatSinger(item) }}</p>
          </div>
        </div>
        <svg-icon iconClass="right-menu" />
      </div>
    </van-list>
  </div>
</template>

<script>
import Vue from "vue";
import request from "@/services/index";
import { List } from "vant";
import { mapGetters, mapActions } from "vuex";
Vue.use(List);

export default {
  data() {
    return {
      loading: false,
      finished: false,
      recommendList: [],
    };
  },
  computed: {
    ...mapGetters(["recommendCoverImg"]),
    getCoverBg() {
      return {
        background: `url(${this.recommendCoverImg}) no-repeat`,
        backgroundSize: "100% auto",
      };
    },
  },
  methods: {
    // 获取每日推荐歌曲
    queryRecommendSong() {
      request.queryRecommendSong().then((res) => {
        this.finished = true;
        this.recommendList = res.data.dailySongs;
        console.log("每日推荐歌曲", res);
      });
    },
    // 格式化歌手名字
    formatSinger(singer) {
      return singer.ar[0].name + "-" + singer.al.name;
    },
    querySong(item) {
      const { id } = item;
      this.setCurSongUrl({ id });
    },
    goBack() {
      this.$router.back();
    },
    ...mapActions({
      setCurSongUrl: "setCurSongUrl",
    }),
  },
};
</script>

<style lang="stylus">
.recommend-wrapper
  height 100%
  .cover
    height 340px
    position relative
    svg
      color #000
      position absolute
      left 40px
      top 20px
  .van-list
    position relative
    top -60px
    .cell-item
      position: relative;
      display: flex;
      justify-content space-between
      align-items center
      box-sizing: border-box;
      width: 100%;
      padding: 20px 32px;
      overflow: hidden;
      color: #323233;
      font-size: 28px;
      line-height: 48px;
      background-color: #fff;
      &:first-child
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
      &:after
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 16px;
        bottom: 0;
        left: 16px;
        border-bottom: 1px solid #ebedf0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
      .singer-info
        display flex
        align-items center
        img
          width 80px
          height 80px
          border-radius 50%
          margin-right 40px
</style>
