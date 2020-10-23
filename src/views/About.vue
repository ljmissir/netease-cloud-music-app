<template>
  <div>
    {{ username }}
  </div>
</template>

<script>
const { reactive, toRefs, computed } = require("vue");
const { useStore } = require("vuex");

export default {
  setup() {
    const store = useStore();

    const state = reactive({
      count: 0
    });

    const username = computed(() => store.state.username);

    return {
      username,
      ...toRefs(state)
    };
  }
};
</script>

<style lang="scss" scoped></style>
