<template>
  <div class="song-list-wrapper">
    <van-list>
      <van-cell
        is-link
        v-for="song in songList"
        :key="song.id"
      >
        <div className="info">
          <img
            class="avatar"
            :src="song.al.picUrl"
            alt=""
          >
            <div>
              <p className="song-name">{{song.name}}</p>
              <p className="singer-info">
                <span className="singer-name">{{song.ar[0].name}}</span>
                <span> - </span>
                <span className="al-name">{{song.al.name}}</span>
              </p>
            </div>
        </div>
        </van-cell>
    </van-list>
  </div>
</template>

<script>
import { List, Cell } from "vant";
import request from "@/services";
const { reactive, toRefs, onMounted } = require("vue");

export default {
  components: {
    VanList: List,
    VanCell: Cell,
  },
  setup() {
    const state = reactive({
      songList: [],
    });

    onMounted(() => {
      queryRecommend();
    });

    const queryRecommend = async () => {
      const result = await request.queryRecommendSong();
      state.songList = result.data.dailySongs;
    };

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.song-list-wrapper {
  .info {
    font-size: 28px;
    display: flex;
    .avatar {
      width: 100px;
      margin-right: 30px;
      border-radius: 6px;
    }
    .singer-info {
      font-size: 24px;
      .singer-name {
        color: rgb(89, 89, 148);
      }
      .al-name {
        color: rgb(154, 154, 154);
      }
    }
  }
}
</style>