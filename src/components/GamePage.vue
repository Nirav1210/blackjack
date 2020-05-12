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
.game-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.dealer-view {
  height: 50%;
  display: flex;
  background-color: pink;
}
.player-view {
  height: 50%;
  display: flex;
  background-color: yellow;
}
</style>
