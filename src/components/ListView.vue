<template>
  <div
    class="list-view"
    :class="getListClass"
    @scroll="scrollEvent"
    ref="viewContainer"
  >
    <div class="virtual-list" :style="{ height: listHeight + 'px' }"></div>
    <van-list
      class="list-body"
      :style="{ transform: `translate3d(0, ${startOffset}px, 0)` }"
    >
      <van-cell
        :class="getCellClass"
        v-for="item in visibleList"
        :key="item.id"
        is-link
        @click="toDetail(item)"
      >
        <div v-if="!isSong">
          <img class="avatar" :src="item.picUrl" alt="" />
          <span>{{ item.name }}</span>
        </div>
        <div v-else>
          <div class="info">
            <img
              class="avatar"
              v-show="showAvatar"
              :src="item.al.picUrl"
              alt=""
            />
            <div>
              <p class="song-name">{{ item.name }}</p>
              <p class="singer-info">
                <span class="singer-name">{{ item.ar[0].name }}</span>
                <span> - </span>
                <span class="al-name">{{ item.al.name }}</span>
              </p>
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import request from "@/services";
import { List, Cell } from "vant";
import utils from "@/utils";
const {
  reactive,
  toRefs,
  onMounted,
  computed,
  ref,
  getCurrentInstance
} = require("vue");

export default {
  props: {
    listData: {
      required: true,
      default: () => new Array(),
      type: Array
    },
    isSong: {
      required: false,
      default: false,
      type: Boolean
    },
    showAvatar: {
      type: Boolean,
      default: true
    }
  },
  components: {
    VanList: List,
    VanCell: Cell
  },
  setup(props, context) {
    const state = reactive({
      startIndex: 0,
      endIndex: null,
      itemHeight: 60,
      startOffset: 0
    });

    const instance = getCurrentInstance();
    console.log(instance, 1234);

    const { listData, isSong, showAvatar } = toRefs(props);

    const viewContainer = ref(null);

    const getListClass = computed(() => (isSong.value ? "song-list" : ""));

    const getCellClass = computed(() => (isSong.value ? "song-item" : ""));

    // 虚拟列表总高度
    const listHeight = computed(() => listData.value.length * state.itemHeight);

    // 屏幕高度
    const screenHeight = computed(() => window.innerHeight);

    // 可视区渲染项数
    const visibleCount = computed(() => {
      return Math.ceil(screenHeight.value / state.itemHeight);
    });

    // 可视区渲染数据
    const visibleList = computed(() => {
      return listData.value.slice(
        state.startIndex,
        Math.min(state.endIndex, listData.value.length)
      );
    });

    // 监听滚动
    const scrollEvent = utils.debounce(() => {
      // 当前滚动位置
      const scrollTop = viewContainer.value.scrollTop;
      // 此时的开始索引
      state.startIndex = Math.floor(scrollTop / state.itemHeight);
      // 此时的结束索引
      state.endIndex = state.startIndex + visibleCount.value;
      // 滚动时列表的偏移量
      state.startOffset = scrollTop - (scrollTop % state.itemHeight);

      console.log(
        scrollTop,
        state.startIndex,
        state.endIndex,
        state.startOffset
      );
    }, 100);

    const toDetail = (item) => {
      const { emit } = context;
      emit("toDetail", item);
    };

    onMounted(() => {
      state.endIndex = state.startIndex + visibleCount.value;
    });

    return {
      ...toRefs(state),
      scrollEvent,
      listHeight,
      viewContainer,
      visibleList,
      toDetail,
      getListClass,
      getCellClass,
      showAvatar
    };
  }
};
</script>

<style lang="scss" scoped>
.list-view {
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  overflow-y: auto;
  .virtual-list {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
  }
  .van-list {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    .van-cell {
      display: flex;
      align-items: center;
      height: 120px;
      .avatar {
        width: 80px;
        height: 80px;
        margin-right: 30px;
        border-radius: 50%;
      }
      &.song-item {
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
}
</style>
