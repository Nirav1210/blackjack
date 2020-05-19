<template>
  <div class="game-panel">
    <div class="dealer-view">
      <Card
        v-for="card in dealerCards"
        :key="card.value + card.suit"
        :card-value="card.value"
        :card-suit="card.suit"
        :is-face-down="dealerCards.length == 1"
      />
      <div class="score-total">
        <ScoreBubble :score="dealerTotal"></ScoreBubble>
      </div>
    </div>
    <!-- <ScoreCard></ScoreCard> -->
    <div v-if="isResultOut" class="result-button">
      <p>{{ result }}</p>
    </div>
    <!--  -->
    <div class="player-view">
      <Card
        v-for="card in playerCards"
        :key="card.value + card.suit"
        :card-value="card.value"
        :card-suit="card.suit"
      />
      <div class="score-total">
        <ScoreBubble :score="playerTotal"></ScoreBubble>
      </div>
    </div>
    <ButtonPanel
      :is-result-out="isResultOut"
      @stand="onStand"
      @hit="onHit"
      @newGame="resetGame"
    />
    <div class="score-panel">
      <Bank :result="result" />
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import ButtonPanel from "./ButtonPanel.vue";
import Bank from "./Bank.vue";
import ScoreBubble from "./Score.vue";
import { createShoe, getHandTotal, RESULT_SCORE } from "../blackjack.js";

export default {
  name: "GamePage",
  components: {
    Card,
    Bank,
    ScoreBubble,
    ButtonPanel
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
      score: 100,
      shoe: [],
      playerCards: [],
      dealerCards: [],
      result: null
    };
  },
  created() {
    this.resetGame();
  },
  computed: {
    playerTotal() {
      return getHandTotal(this.playerCards);
    },
    dealerTotal() {
      return getHandTotal(this.dealerCards);
    },
    isResultOut() {
      return this.result !== null;
    }
  },
  methods: {
    resetGame() {
      this.shoe = [];
      this.playerCards = [];
      this.dealerCards = [];
      this.result = null;
      this.shoe = createShoe();
      this.playerCards.push(this.shoe.shift());
      this.playerCards.push(this.shoe.shift());
      this.dealerCards.push(this.shoe.shift());
      this.dealerCards.push(this.shoe.shift());
    },
    onHit() {
      this.playerCards.push(this.shoe.shift());
      if (parseInt(this.playerTotal) > 21) {
        this.result = "Dealer won!";
      }
    },
    onStand() {
      this.dealersPlay();
    },
    dealersPlay() {
      this.dealerCards.push(this.shoe.shift());
      if (this.dealerTotal >= 17) {
        this.result = this.calculateResult();
      } else {
        this.dealersPlay();
      }
    },
    calculateResult() {
      let player = parseInt(this.playerTotal);
      let dealer = parseInt(this.dealerTotal);
      if (player == dealer) {
        return "Stand off!";
      }
      if (dealer > 21) {
        return "Player won!";
      }
      if (player <= 21) {
        if (player > dealer) {
          if (player == 21) {
            if (this.playerCards.length == 2) {
              return "Black Jack! - Player";
            }
          }
          return "Player won!";
        }
      }
      if (dealer <= 21) {
        if (dealer > player) {
          if (dealer == 21) {
            if (this.dealerCards.length == 2) {
              return "Black Jack! - Dealer";
            }
          }
          return "Dealer won!";
        }
      }
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
  height: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
}
.player-view {
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
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
  bottom: 0;
}
.result-button {
  background: #e4c580;
  border-radius: 1%;
  padding: 2%;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
