<template>
  <div class="game-panel">
    <div class="dealer-side">
      <GameHand
        :hand="dealerHand"
        :is-face-down="!dealersTurn"
        :hand-index="0"
      />
    </div>
    <div class="player-side">
      <GameHand
        v-for="(hand, i) in playerHands"
        :key="i"
        :hand="hand"
        :hand-index="i"
      />
    </div>
    <ButtonPanel />
    <div class="score-panel">
      <!-- <Bank :game-score="bank" /> -->
    </div>

    <!-- sample todo -->
    <!-- <p>{{ getTodosById(1) }}</p> -->
  </div>
</template>

<script>
import Card from "./Card.vue";
import ButtonPanel from "./ButtonPanel.vue";
import Bank from "./Bank.vue";
import ScoreBubble from "./Score.vue";
import ScoreCard from "./ScoreCard.vue";
import GameHand from "./GameHand.vue";
import { RESULT_SCORE } from "../blackjack.js";

import { mapState, mapGetters } from "vuex";

export default {
  name: "GamePage",
  components: {
    Card,
    Bank,
    ScoreBubble,
    ButtonPanel,
    ScoreCard,
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
    ...mapState(["hands", "roundOver", "bank"]),
    isRoundOver() {
      return this.roundOver;
    },
    dealersTurn() {
      const allPlayersStanding = this.hands.every(hand => hand.isStanding);
      return allPlayersStanding ? true : false;
    },
    dealerHand() {
      return this.hands[0];
    },
    playerHands() {
      let clone = this.hands.slice();
      clone.shift();
      return clone;
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

<style scoped>
.game-panel {
  height: 100%;
  margin: 0.5em;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.dealer-side {
  display: flex;
  flex-flow: row nowrap;
  margin-top: 1rem;
  min-height: 12.4rem;
  justify-content: center;
  /* align-items: center; */
  /* flex-direction: row; */
  /* position: relative; */
  /* width: max-content; */
  /* margin: auto; */
  padding: 1em;
}
.player-side {
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  /* flex-direction: row; */
  /* width: max-content; */
  /* position: relative; */
  /* margin: auto; */
  padding: 1em;
  justify-content: space-around;
  flex: 1 0 auto;
  flex-flow: row nowrap;
}
.score-panel {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 50%;
  z-index: 1;
  margin-bottom: -50%;
  transform: translate(0%, -50%);
}
/* .score-total {
  position: absolute;
  top: 0;
  right: 0;
} */
.result-button {
  /* background: #e4c580; */
  /* border-radius: 1%; */
  /* position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  z-index: 1;
  margin-bottom: -50%;
  transform: translate(-50%, -50%); */
}
/* This only changes this particular animation duration */
/* .animate__animated.animate__backInDown {
  --animate-duration: 2s;
} */
</style>
