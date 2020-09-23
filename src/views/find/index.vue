<template>
  <div class="find-wrapper">
    <Search />
    <Banner />
    <Tab />
    <Disc />
  </div>
</template>

<script>
import Search from "./components/search";
import Banner from "./components/banner";
import Tab from "./components/tab";
import Disc from "./components/disc";
const { reactive, toRefs } = require("vue");

export default {
  components: {
    Search,
    Banner,
    Tab,
    Disc,
  },
  setup() {
    const state = reactive({});

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.find-wrapper /deep/ .van-search__content {
  background: rgb(201, 84, 74);
  opacity: 0.6;
}

.find-wrapper /deep/ input {
  color: #fff;
}

.find-wrapper {
  height: 100%;
  position: relative;
}
</style>
