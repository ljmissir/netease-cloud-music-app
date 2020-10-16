<template>
  <div class="singer-list">
    <van-list
      v-model="loading"
      :finished="finished"
      offset="30"
      finished-text="没有更多了"
      @load="querySinger"
    >
      <van-cell
        v-for="singer in singerList"
        :key="singer.id"
        @click="querySongs(singer)"
        is-link
      >
        <img class="avatar" :src="singer.picUrl" alt="" />
        <span>{{ singer.name }}</span>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import request from "@/services";
import { List, Cell } from "vant";
const { reactive, toRefs, onMounted } = require("vue");
const { useRouter } = require("vue-router");

export default {
  components: {
    VanList: List,
    VanCell: Cell,
  },
  setup() {
    const state = reactive({
      singerList: [],
      offset: 0,
      loading: true,
      finished: false,
      limit: 30,
    });

    const router = useRouter();

    // 查询歌手列表
    const querySinger = () => {
      let { singerList, limit, offset } = state;
      request.querySingerList({ type: -1, limit, offset }).then((res) => {
        state.loading = false;
        state.offset += state.limit;
        if (res.artists.length === 0) {
          state.finished = true;
        }
        if (!res.more) {
          state.finished = true;
        }
        state.singerList = [...state.singerList, ...res.artists];
      });
    };

    // 根据歌手id查询歌手的歌曲
    const querySongs = (singer) => {
      router.push(`/singer/${singer.id}`);
    };

    onMounted(() => {
      // querySinger();
    });

    return {
      ...toRefs(state),
      querySinger,
      querySongs,
    };
  },
};
</script>

<style lang="scss" scoped>
.singer-list {
  .van-list {
    .van-cell {
      display: flex;
      align-items: center;
      .avatar {
        width: 80px;
        height: 80px;
        margin-right: 30px;
        border-radius: 50%;
      }
    }
  }
}
</style>
