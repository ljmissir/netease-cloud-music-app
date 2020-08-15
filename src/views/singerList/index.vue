<template>
  <div class="song-list-wrapper">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        is-link
        v-for="singer in singerList"
        :key="singer.id"
        @click="querySong(singer.id)"
      >
        <img class="avatar" v-lazy="singer.picUrl" alt />
        <span class="song">{{ singer.name }}</span>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import Vue from "vue";
import request from "@/services/index";
import { List, Cell } from "vant";
console.log(request, 12);
Vue.use(List);
Vue.use(Cell);

export default {
  data() {
    return {
      loading: false,
      finished: false,
      songId: null,
      singerList: [],
      offset: 0,
      limit: 25,
    };
  },
  methods: {
    onLoad() {
      const { list, limit, offset } = this;
      request.querySingerList({ type: -1, limit, offset }).then((res) => {
        this.loading = false;
        this.offset += this.limit;
        if (!res.more) {
          this.finished = true;
        }
        this.singerList = [...this.singerList, ...res.artists];
      });
    },
    querySong(id) {
      this.$router.push(`/songList?id=${id}`);
    },
  },
};
</script>

<style lang="stylus">
.song-list-wrapper /deep/ .van-cell__value {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.song-list-wrapper {
  .van-list {
    .van-cell {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
  }
}
</style>
