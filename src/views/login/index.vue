<template>
  <div class="login-wrapper">
    <van-field
      placeholder="输入邮箱"
      v-model="email"
    />
    <van-field
      placeholder="输入密码"
      type="password"
      v-model="password"
    />
    <van-button
      class="login-btn"
      type="primary"
      @click="submit"
      :disabled="disabled"
    >登录</van-button>
  </div>
</template>

<script>
import { Button, Field } from "vant";
const { reactive, toRefs, computed } = require("vue");
const { useStore } = require("vuex");

export default {
  components: { VanButton: Button, VanField: Field },
  setup() {
    const store = useStore();

    const state = reactive({
      email: "ljmissir@163.com",
      password: "",
    });

    const disabled = computed(() => {
      return !state.email || !state.password;
    });

    const setUser = params => {
      store.dispatch("setUser", params);
    };

    const submit = () => {
      const { email, password } = state;
      setUser({ email, password });
    };

    return {
      ...toRefs(state),
      submit,
      disabled,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  padding: 0 40px;
  margin: 40% auto;

  .van-cell {
    padding: 26px 16px;

    &:first-child {
      margin-bottom: 30px;
    }
  }

  .login-btn {
    width: 100%;
    background: rgb(202, 62, 47);
    border: none;
    border-radius: 40px;
    margin-top: 60px;
  }
}
</style>
