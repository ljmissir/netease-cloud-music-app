<template>
  <div class="song-list">
    <van-list>
      <van-cell
        class="song-item"
        v-for="song in songs"
        :key="song.id"
        is-link
        @click="querySong(song)"
      >
        <div class="info">
          <img
            class="avatar"
            v-show="showAvatar"
            :src="song.al.picUrl"
            alt=""
          />
          <div>
            <p class="song-name">{{ song.name }}</p>
            <p class="singer-info">
              <span class="singer-name">{{ song.ar[0].name }}</span>
              <span> - </span>
              <span class="al-name">{{ song.al.name }}</span>
            </p>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { List, Cell } from "vant";
const { reactive, toRefs } = require("vue");
const { useStore } = require("vuex");

export default {
  props: {
    songs: {
      type: Array,
      require: true,
    },
    showAvatar: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    VanList: List,
    VanCell: Cell,
  },
  setup(props) {
    const state = reactive({
      count: 0,
    });

    const { songs } = toRefs(props);

    const store = useStore();

    const querySong = async (song) => {
      const { id } = song;
      const setPlayList = () => store.dispatch("setPlayList", { songs, id });
      await setPlayList();
    };

    return {
      ...toRefs(state),
      songs,
      querySong,
    };
  },
};
</script>

<style lang="scss" scoped>
.song-list {
  height: 100%;
  width: 100%;
  .van-list {
    // padding-bottom: 100px;
    .song-item {
      border-radius: 40px 40px 0px 0px;
      display: flex;
      align-items: center;
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
  }
}
</style>
