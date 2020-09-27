<template>
  <div>
    用户中心
  </div>
</template>

<script>
import request from "@/services";
const { reactive, toRefs, onMounted } = require("vue");

export default {
  setup() {
    const state = reactive({
      subCount: {},
    });

    const queryUserSubcount = async () => {
      const result = await request.queryUserSubcount();
      state.subCount = result;
      console.log(result);
    };

    onMounted(() => {
      queryUserSubcount();
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped></style>
