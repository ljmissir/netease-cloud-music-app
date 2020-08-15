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
        v-for="song in songList"
        :key="song.id"
        @click="querySong(song.id)"
      >
        <img class="avatar" v-lazy="song.picUrl" alt />
        <span class="song">{{ song.name }}</span>
      </van-cell>
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
      limit: 25,
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
        .then((res) => {
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
      this.setCurSongUrl({ id });
      // request.querySongUrl({ id }).then((res) => {
      //   console.log(res);
      //   this.musicUrl = res.data[0].url;
      // });
    },
    ...mapActions({
      setCurSongUrl: "setCurSongUrl",
    }),
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
