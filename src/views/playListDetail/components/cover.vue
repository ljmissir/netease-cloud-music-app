<template>
  <div class="cover-wrapper">
    <div class="cover"></div>
    <div class="cover-content">
      <div class="img-wrapper">
        <img class="img" :src="coverInfo.coverImgUrl" />
        <div class="description">
          <div class="name">{{ coverInfo.name }}</div>
          <div class="nick-name">
            <img :src="coverInfo.avatarUrl" />
            <span>{{ coverInfo.nickname }}</span>
          </div>
          <div class="desc">{{ coverInfo.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { reactive, toRefs } = require("vue");

export default {
  props: {
    coverInfo: {
      type: Object,
      require: true,
    },
  },
  setup(props) {
    const state = reactive({
      count: 0,
    });

    const { coverInfo } = toRefs(props);

    return {
      ...toRefs(state),
      coverInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.cover-wrapper {
  overflow: hidden;
  height: 500px;
  .cover {
    height: 500px;
    width: 100%;
    position: absolute;
    top: 0;
    // z-index: -1;;
    filter: blur(25px);
    transform: scale(1);
    background-size: cover !important;
    background: rgb(74, 71, 66);
  }
  .cover-content {
    position: absolute;
    z-index: 1;
    padding: 40px 30px 20px 30px;
    .img-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 260px;
        border-radius: 10px;
        margin-right: 30px;
      }
      .description {
        color: rgb(202, 192, 192);
        .name {
          font-size: 30px;
        }
        .nick-name {
          padding: 30px 0;
          display: flex;
          align-items: center;
          img {
            width: 50px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
        .desc {
          line-height: 1.4;
        }
      }
    }
  }
}
</style>
