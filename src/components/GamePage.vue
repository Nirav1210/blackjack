<template>
  <div class="game-panel">
    <div class="dealer-view">
      <Card
        v-for="(card, index) in dealerHand.cards"
        :key="card.value + card.suit"
        :card-value="card.value"
        :card-suit="card.suit"
        :is-face-down="index == 0 && !dealersTurn"
      />
      <div v-if="dealersTurn" class="score-total">
        <ScoreBubble :score="dealerHandTotal"></ScoreBubble>
      </div>
      <ScoreCard
        v-if="isRoundOver"
        :result="dealerHand.result"
        class="result-button"
      >
      </ScoreCard>
    </div>
    <div class="player-view">
      <Card
        v-for="card in playerHand.cards"
        :key="card.value + card.suit"
        :card-value="card.value"
        :card-suit="card.suit"
      />
      <div class="score-total">
        <ScoreBubble :score="playerHandTotal"></ScoreBubble>
      </div>
      <ScoreCard
        v-if="isRoundOver"
        :result="playerHand.result"
        class="result-button"
      >
      </ScoreCard>
    </div>
    <ButtonPanel :is-result-out="isRoundOver" />
    <div class="score-panel">
      <Bank :game-score="bank" />
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
import { RESULT_SCORE } from "../blackjack.js";

import { mapState, mapGetters } from "vuex";

export default {
  name: "GamePage",
  components: {
    Card,
    Bank,
    ScoreBubble,
    ButtonPanel,
    ScoreCard
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
    playerHand() {
      return this.hands[1];
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
  flex-direction: column;
}
.dealer-view {
  display: flex;
  /* justify-content: center;
  align-items: center; */
  flex-direction: row;
  position: relative;
  width: max-content;
  margin: auto;
  padding: 1em;
}
.player-view {
  display: flex;
  /* justify-content: center;
  align-items: center; */
  flex-direction: row;
  width: max-content;
  position: relative;
  margin: auto;
  padding: 1em;
  /* flex: 1 0 auto; */
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
.score-total {
  position: absolute;
  top: 0;
  right: 0;
}
.result-button {
  /* background: #e4c580; */
  /* border-radius: 1%; */
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  z-index: 1;
  margin-bottom: -50%;
  transform: translate(-50%, -50%);
}
</style>
