<template>
  <div class="player-wrapper">
    <audio
      src="url"
      class="audio"
    ></audio>
  </div>
</template>

<script>
const { reactive, toRefs } = require("vue");
const { useStore } = require("vuex");

export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    const store = useStore();
    console.log(store.getters);

    return {
      ...toRefs(state),
      // url,
    };
  },
};
</script>

<style lang="scss" scoped>
.player-wrapper {
  .audio {
    display: none;
  }
}
</style>