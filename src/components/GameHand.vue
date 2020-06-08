<template>
  <div :class="handClasses">
    <transition-group name="deal" tag="div">
      <Card
        v-for="(card, index) in hand.cards"
        v-bind:key="card.value + card.suit"
        :card-value="card.value"
        :card-suit="card.suit"
        :is-face-down="index == 0 && isFaceDown"
      />
    </transition-group>
    <div v-if="!isFaceDown" class="score-total">
      <ScoreBubble :score="handTotal"></ScoreBubble>
    </div>
    <Result
      :is-displayed="handIndex != 0 && isRoundOver"
      :result="getResult"
      class="round-result"
    >
    </Result>
  </div>
</template>

<script>
import Card from "./Card.vue";
import ScoreBubble from "./Score.vue";
import Result from "./Result.vue";
import { getHandTotal } from "../blackjack";

import { mapState } from "vuex";

export default {
  name: "GamePage",
  components: {
    Card,
    ScoreBubble,
    Result,
  },
  props: {
    hand: {
      type: Object,
      default: () => {}
    },
    isFaceDown: {
      type: Boolean,
      default: false
    },
    handIndex: {
      type: Number,
      required: true
    }
  },
  data: () => {
    return {};
  },
  computed: {
    ...mapState(["hands", "roundOver", "bank"]),
    isRoundOver() {
      return this.roundOver;
    },
    handTotal() {
      return getHandTotal(this.hand.cards).toString();
    },
    getResult() {
      return this.hand.result;
    },
    handClasses() {
      return this.handIndex == 0 ? "game-hand is-dealer" : "game-hand";
    }
  }
};
</script>

<style scoped>
.game-hand {
  position: relative;
  padding: 1em;
  transition: transform 0.2s ease;
}
.game-hand.is-dealer {
  transform: scale(0.9);
}
.score-total {
  position: absolute;
  top: 0;
  right: 0;
}
.round-result {
  position: absolute;
  width: 50%;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 1;
  text-align: center;
  font-weight: 900;
  font-size: larger;
  bottom: 0.5em;
}
.deal-enter-active {
  animation: deal 0.3s;
}
.deal-leave-active {
  animation: deal 0.3s reverse;
  animation-duration: 0;
}
.deal-move {
  transition: transform 0.5s;
}
@keyframes deal {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
