<template>
  <div class="search-wrapper">搜索</div>
</template>

<script>
import request from "@/services/index";

export default {
  data() {
    return {
      hotList: [],
    };
  },
  created() {
    this.queryHotSearchList();
  },
  methods: {
    // 获取热搜列表
    queryHotSearchList() {
      request.queryHotSearchList().then(res => {
        this.hotList = res.result.hots;
        console.log("热搜列表", this.hotList);
      });
    },
  },
};
</script>
