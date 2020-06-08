<template>
  <div class="game-panel">
    <div class="dealer-side">
      <GameHand
        :hand="dealerHand"
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
    <ButtonPanel />
  </div>
</template>

<script>
import ButtonPanel from "./ButtonPanel.vue";
import GameHand from "./GameHand.vue";

import { mapState, mapGetters } from "vuex";

export default {
  name: "GamePage",
  components: {
    ButtonPanel,
    GameHand
  },
  props: {
    msg: String,
    nbDecks: {
      type: Number,
      default: 1
    }
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
    ...mapGetters(["getPlayerTotal", "getDealerTotal"]),
    ...mapState(["hands", "roundOver", "bank", "activeHandIndex"]),
    isRoundOver() {
      return this.roundOver;
    },
    dealerHand() {
      return this.hands[0];
    },
    playerHands() {
      let clone = this.hands.slice();
      clone.shift();
      return this.hands;
    },
    dealerHandTotal() {
      return this.getDealerTotal.toString();
    },
    playerHandTotal() {
      return this.getPlayerTotal.toString();
    }
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
.game-panel {
  height: 100%;
  margin: 0.5em;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.dealer-side, .player-side {
  display: flex;
  min-height: 11em;
  align-items: center;
  padding: 1em;
}
.dealer-side {
  flex-flow: row nowrap;
  justify-content: center;
}
.player-side {
  justify-content: space-around;
  flex: 1 0;
  flex-flow: row nowrap;
}
</style>
