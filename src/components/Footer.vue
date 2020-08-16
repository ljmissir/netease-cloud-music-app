<template>
  <div class="footer">
    <router-link
      class="footer-item"
      v-for="(item,index) in footerList"
      :key="index"
      :to="item.path"
    >
      <div class="icon-wrapper">
        <svg-icon :iconClass="item.iconClass" />
      </div>
      <p>{{item.name}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerList: [
        { name: "发现", iconClass: "netease", path: "/find" },
        { name: "视频", iconClass: "video", path: "/video" },
        { name: "我的", iconClass: "mine", path: "/mine" },
        { name: "云村", iconClass: "cloud", path: "/cloud" },
        { name: "账号", iconClass: "account", path: "/account" }
      ]
    };
  }
};
</script>

<style lang="stylus">
.footer {
  width: 100%;
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  background: rgb(243, 242, 245);
  z-index: 100;

  .footer-item {
    flex: 1;
    text-align: center;

    .icon-wrapper {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &.router-link-active {
      p {
        color: red;
      }

      .icon-wrapper {
        background: red;
        color: #fff;
      }
    }

    p {
      text-align: center;
      padding-top: 6px;
    }
  }
}
</style>