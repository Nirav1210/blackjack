<template>
  <div class="game-panel">
    <div class="dealer-view">
      <Card card-type="green_back" />
    </div>
    <div class="player-view">
      <Card card-type="green_back" />
    </div>
    <div class="button-panel-view">
      <ButtonPanel />
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import ButtonPanel from "./ButtonPanel.vue";
export default {
  name: "GamePage",
  components: {
    Card,
    ButtonPanel
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
  height: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.player-view {
  height: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-panel-view {
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
