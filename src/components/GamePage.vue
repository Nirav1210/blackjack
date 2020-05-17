<template>
  <div class="game-panel">
    <div class="dealer-view">
      <Card
        v-for="card in dealerCards"
        :key="card.value + card.suit"
        :card-type="`${card.value + card.suit}`"
      />
    </div>
    <div class="player-view">
      <Card
        v-for="card in playerCards"
        :key="card.value + card.suit"
        :card-type="`${card.value + card.suit}`"
      />
    </div>
    <div class="button-panel-view">
      <!-- <ButtonPanel /> -->
      <div class="button-panel">
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
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
// import ButtonPanel from "./ButtonPanel.vue";
import Button from "./Button.vue";
// import { CARD_NAMES } from "../constants";
import { createShoe } from "../blackjack.js";

export default {
  name: "GamePage",
  components: {
    Card,
    Button
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
      isPlayersTurn: true,
      shoe: [],
      playerCards: [],
      dealerCards: []
    };
  },
  created() {
    this.shoe = createShoe();
    console.log(this.shoe);

    this.playerCards.push(this.shoe.shift());
    this.dealerCards.push(this.shoe.shift());
  },
  methods: {
    addPlayerCard() {
      this.playerCards.push(this.shoe.shift());
    },
    addDealarCards() {
      this.dealerCards.push(this.shoe.shift());
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
.button-panel {
  display: flex;
}
.buttons {
  margin: 0 10px;
  width: 25%;
  height: 100%;
}
</style>
