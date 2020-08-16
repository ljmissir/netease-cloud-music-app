<template>
  <div class="player-wrapper">
    <audio :src="curSong" autoplay></audio>
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
