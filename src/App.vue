<template>
  <div id="app">
    <router-view />
    <Player />
  </div>
</template>

<script>
import Player from "@/views/player/index";

export default {
  components: { Player },
};
</script>

<style lang="stylus">
@import './styls/_normalize.styl';

#app
  height: 100%;
</style>
