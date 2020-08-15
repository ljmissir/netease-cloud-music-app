<template>
  <div class="player-wrapper">
    <video :src="curSong" autoplay></video>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters(["curSong"]) },
};
</script>

<style lang="stylus">
.player-wrapper
  position fixed
</style>
