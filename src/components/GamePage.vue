<template>
  <div class="game-area">
    <div class="dealer-side">
      <GameHand
        :hand="this.hands[0]"
        :is-face-down="activeHandIndex != 0"
        :hand-index="0"
      />
    </div>
    <div class="player-side">
      <GameHand
        v-for="(hand, i) in hands"
        :key="i"
        :hand="hand"
        v-if="i > 0"
        :hand-index="i"
      />
    </div>
    <Chip class="bank" color="orange" :quantity="bank[1]"></Chip>
    <ButtonPanel />
  </div>
</template>

<script>
import ButtonPanel from "./ButtonPanel.vue";
import GameHand from "./GameHand.vue";
import Chip from "./Chip.vue";

import { mapState } from "vuex";

export default {
  name: "GamePage",
  components: {
    ButtonPanel,
    GameHand,
    Chip
  },
  data: () => {
    return {
      result: null
    };
  },
  created() {
    this.$store.dispatch("initGame");
  },
  computed: {
    ...mapState(["hands", "bank", "activeHandIndex"])
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
.game-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.dealer-side {
  display: flex;
  min-height: 11em;
  align-items: center;
  padding: 1em;
  flex-flow: row nowrap;
  justify-content: center;
}
.player-side {
  display: flex;
  min-height: 11em;
  align-items: center;
  padding: 1em;
  justify-content: space-around;
  flex: 1 0;
}
.bank {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 3em;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
