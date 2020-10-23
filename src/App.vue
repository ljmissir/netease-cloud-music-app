<template>
  <div class="app">
    <router-view />
    <TabBar v-show="showTabbar" />
    <Player />
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
import Player from "@/views/player";
const { useRoute } = require("vue-router");
const { computed } = require("vue");

export default {
  components: { TabBar, Player },
  setup() {
    const route = useRoute();

    const showTabbar = computed(() => {
      return route.path.indexOf("/login") === -1;
    });

    return { showTabbar };
  }
};
</script>

<style lang="scss">
.app {
  padding-bottom: 100px;
}
</style>
