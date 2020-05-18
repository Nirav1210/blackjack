<template>
  <div class="game-panel">
    <div class="dealer-view">
      <Card
        v-for="card in dealerCards"
        :key="card.value + card.suit"
        :card-value="card.value"
        :card-suit="card.suit"
      />
      <div class="score-total">
        <Button :button-name="getDealerTotal"></Button>
      </div>
    </div>
    <div v-if="isResultOut" class="result-button">
      <p>{{ result }}</p>
    </div>
    <div class="player-view">
      <Card
        v-for="card in playerCards"
        :key="card.value + card.suit"
        :card-value="card.value"
        :card-suit="card.suit"
      />
      <div class="score-total">
        <Button :button-name="getCurrentTotal"></Button>
      </div>
    </div>
    <div class="button-panel-view">
      <!-- <ButtonPanel /> -->
      <div v-if="!isResultOut" class="button-panel">
        <div class="buttons">
          <Button button-name="Stand" @click.native="addDealarCards()"></Button>
        </div>
        <div class="buttons">
          <Button button-name="Hit!" @click.native="addPlayerCard()"></Button>
        </div>
        <div class="buttons">
          <Button button-name="Double Down"></Button>
        </div>
        <div class="buttons">
          <Button button-name="Split Pairs"></Button>
        </div>
        <div class="buttons">
          <Button button-name="Surrender"></Button>
        </div>
      </div>
      <div v-if="isResultOut">
        <Button button-name="Reset" @click.native="resetGame()"></Button>
      </div>
    </div>
    <div class="score-panel">
      <ScoreCard :score="100"></ScoreCard>
      <ScoreCard :score="50"></ScoreCard>
      <ScoreCard :score="25"></ScoreCard>
      <ScoreCard :score="10"></ScoreCard>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
// import ButtonPanel from "./ButtonPanel.vue";
import Button from "./Button.vue";
import ScoreCard from "./Chip.vue";
import { createShoe, getHandTotal, RESULTS } from "../blackjack.js";

export default {
  name: "GamePage",
  components: {
    Card,
    Button,
    ScoreCard
    // ButtonPanel
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
      isPlayerStanding: false,
      isResultOut: false,
      result: null
    };
  },
  created() {
    this.resetGame();
  },
  computed: {
    getCurrentTotal() {
      return getHandTotal(this.playerCards);
    },
    getDealerTotal() {
      return getHandTotal(this.dealerCards);
    }
  },
  methods: {
    resetGame() {
      this.shoe = [];
      this.shoe = createShoe();
      this.playerCards = [];
      this.dealerCards = [];
      this.isPlayerStanding = false;
      this.isResultOut = false;
      this.result = null;
      this.playerCards.push(this.shoe.shift());
      this.playerCards.push(this.shoe.shift());
      this.dealerCards.push(this.shoe.shift());
    },
    addPlayerCard() {
      this.playerCards.push(this.shoe.shift());
      if (parseInt(this.getCurrentTotal) > 21) {
        this.calculateResult();
      }
    },
    addDealarCards() {
      this.isPlayerStanding = true;
      this.dealersPlay();
    },
    dealersPlay() {
      // THE DEALER'S PLAY - the dealers face-down card is turned up
      // If the total is 17 or more, it must stand.
      // If the total is 16 or under, they must take a card.
      // If the dealer has an ace, and counting it as 11 would bring the total to 17 or more (but not over 21), the dealer must count the ace as 11 and stand.
      this.dealerCards.push(this.shoe.shift());
      if (getHandTotal(this.dealerCards) >= 17) {
        if (
          getHandTotal(this.dealerCards) == 17 &&
          this.getCurrentTotal == 17
        ) {
          this.dealersPlay();
        }
        this.calculateResult();
      } else {
        this.dealersPlay();
      }
    },
    calculateResult() {
      let player = parseInt(this.getCurrentTotal);
      let dealer = parseInt(getHandTotal(this.dealerCards));
      if (player == 21 && dealer != 21) {
        this.isResultOut = true;
        if (this.playerCards.length == 2) {
          this.result = "Black Jack! - Player";
        }
        this.result = "Player WON";
      }
      if (dealer == 21 && player != 21) {
        this.isResultOut = true;
        if (this.dealerCards.length == 2) {
          this.result = "Black Jack! - Dealer";
        }
        this.result = "Dealer WON";
      }
      if (dealer > player && dealer < 21) {
        this.isResultOut = true;
        this.result = "Dealer won!";
      }
      if (player > dealer && player < 21) {
        this.isResultOut = true;
        this.result = "Player won!";
      }
      if (this.dealerCards.length == 1 && player > 21) {
        this.isResultOut = true;
        this.result = "Player - bust!";
      }
      if (player < 21 && dealer > 21) {
        this.isResultOut = true;
        this.result = "Player won dealer lost!";
      }
      if (this.isPlayerStanding && player == dealer) {
        this.isResultOut = true;
        this.result = "Stand off!";
      }
    }
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
  height: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
}
.player-view {
  height: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
}
.button-panel-view {
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-panel {
  display: flex;
}
.score-panel {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 50%;
  z-index: 0;
  margin-bottom: -50%;
  transform: translate(0%, -50%);
}
.buttons {
  margin: 0 10px;
  width: 25%;
  height: 100%;
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
