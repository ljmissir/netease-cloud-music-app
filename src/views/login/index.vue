<template>
  <div class="login-wrapper">
    <van-field placeholder="输入邮箱" v-model="email" />
    <van-field placeholder="密码" type="password" v-model="password" />
    <van-button
      class="login-btn"
      type="primary"
      @click="login"
      :disabled="disabled"
      >登录</van-button
    >
  </div>
</template>

<script>
import Vue from "vue";
import request from "@/services/index";
import { Button, Field } from "vant";
import { mapActions } from "vuex";

Vue.use(Button);
Vue.use(Field);

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    disabled() {
      const { email, password } = this;
      return !email || !password;
    },
  },
  methods: {
    login() {
      const { email, password } = this;
      this.setCurUser({ email, password });
    },
    ...mapActions({
      setCurUser: "setCurUser",
    }),
  },
};
</script>

<style lang="stylus">
.login-wrapper
  padding 0 40px
  margin 40% auto
  .van-cell
    padding 26px 16px
    &:first-child
      margin-bottom 30px
  .login-btn
    width 100%
    background #C20C0C
    border none
    border-radius 40px
    margin-top 60px
</style>
