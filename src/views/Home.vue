<template>
  <div>
    <van-button
      type='primary'
      @click="setCount"
    >{{ text }}</van-button>
      <hr>
      <div>
        <van-button
          type='primary'
          @click="decrease"
        >-</van-button>{{ count }}
          <van-button
            type='primary'
            @click="increase"
          >+</van-button>
      </div>
      <van-field placeholder='输入用户名' />
  </div>
</template>

<script>
import { Button, Field } from "vant";
const { useCountDown, useCount } = require("../hooks");
const { useStore } = require("vuex");
const { reactive, toRefs, watchEffect, onMounted, computed } = require("vue");

export default {
  components: { VanButton: Button, VanField: Field },
  setup() {
    const store = useStore();

    console.log(store.getters, "getters");

    const state = reactive({
      num: 10,
      number: 5,
    });

    const [text, setCount, curCount] = useCountDown(state.num);

    const [count, increase, decrease] = useCount(state.number);

    const setBaseParams = () => {
      store.dispatch("setBaseParams", { username: "ljmissir" });
    };

    const setUser = () => {
      store.dispatch("setUser", "ljmissir");
    };

    const baseParams = computed(() => store.getters.baseParams);
    console.log(baseParams.value);

    onMounted(() => {});

    watchEffect(() => {
      setBaseParams();
      setUser();
    });

    return {
      text,
      setCount,
      curCount,
      count,
      increase,
      decrease,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
</style>