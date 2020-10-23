<template>
  <div>我的电台</div>
</template>

<script>
const { reactive, toRefs } = require("vue");

export default {
  setup() {
    const state = reactive({
      count: 0
    });

    return {
      ...toRefs(state)
    };
  }
};
</script>

<style lang="scss" scoped></style>
