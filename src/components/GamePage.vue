<template>
  <div class="game-panel">
    <div class="dealer-view">Dealer View</div>
    <div class="player-view">Player View</div>
  </div>
</template>

<script>
export default {
  name: "GamePage",
  components: {},
  props: {
    msg: String
  }
};
</script>

<style scoped>
.dealer-view {
  height: 50%;
  background-color: pink;
}
.player-view {
  height: 50%;
  background-color: yellow;
}
</style>
