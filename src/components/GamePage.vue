<template>
  <div class="game-panel">
    <div class="dealer-view">
      <Card card-type="green_back" />
    </div>
    <div class="player-view">
      <Card card-type="green_back" />
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
export default {
  name: "GamePage",
  components: {
    Card
  },
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
  justify-content: center;
  align-items: center;
}
.player-view {
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
