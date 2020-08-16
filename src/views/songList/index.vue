<template>
  <div class="song-list-wrapper">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell
        is-link
        v-for="song in songList"
        :key="song.id"
        @click="querySong(song.id)"
      >
        <img class="avatar" v-lazy="song.picUrl" alt />
        <span class="song">{{ song.name }}</span>
      </van-cell>-->
      <div
        class="cell-item van-cell"
        v-for="song in songList"
        :key="song.id"
        @click="querySong(song.id)"
      >
        <div class="singer-info">
          <img v-lazy="song.al.picUrl" alt />
          <div class="info">
            <p class="song-name">{{ song.name }}</p>
            <p class="singer-name">{{ formatSinger(song) }}</p>
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
import { List, Cell } from "vant";
import { mapActions } from "vuex";
Vue.use(List);
Vue.use(Cell);

export default {
  data() {
    return {
      loading: false,
      finished: false,
      songId: null,
      songList: [],
      offset: 0,
      limit: 25
    };
  },

  created() {
    this.querySongId();
  },
  methods: {
    onLoad() {
      const { limit, offset } = this;
      request
        .querySongBySingerId({ id: this.songId, limit, offset })
        .then(res => {
          this.loading = false;
          this.offset += this.limit;
          if (!res.more) {
            this.finished = true;
          }
          this.songList = [...this.songList, ...res.songs];
        });
    },
    querySongId() {
      const { id } = this.$route.query;
      this.songId = id;
    },
    querySong(id) {
      const { songList } = this;
      this.setCurSongUrl({ id });
      this.setCurPlayList(this.songList);
    },
    // 格式化歌手名字
    formatSinger(singer) {
      return singer.ar[0].name + "-" + singer.al.name;
    },
    ...mapActions({
      setCurSongUrl: "setCurSongUrl",
      setCurPlayList: "setCurPlayList"
    })
  }
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

      .singer-info {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
