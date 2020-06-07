<template>
  <div class="game-hand">
    <transition-group appear name="deal" tag="div">
      <Card
        v-for="(card, index) in hand.cards"
        :key="card.value + card.suit"
        :card-value="card.value"
        :card-suit="card.suit"
        :is-face-down="index == 0 && isFaceDown"
      />
    </transition-group>
    <div v-if="!isFaceDown" class="score-total">
      <ScoreBubble :score="handTotal"></ScoreBubble>
    </div>
    <transition name="total">
      <div class="hand-side">
        <ScoreCard v-if="isRoundOver" :result="getResult" class="result-button">
        </ScoreCard>
        <Chip v-else color="orange" :value="10"></Chip>
      </div>
    </transition>
    <!-- <ScoreCard :result="getResult" class="result-button">
    </ScoreCard> -->
  </div>
</template>

<script>
import Card from "./Card.vue";
import Chip from "./Chip.vue";
import ScoreBubble from "./Score.vue";
import ScoreCard from "./ScoreCard.vue";
import { getHandTotal } from "../blackjack";

import { mapState } from "vuex";

export default {
  name: "GamePage",
  components: {
    Card,
    ScoreBubble,
    ScoreCard,
    Chip
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
      // return 'win';
    }
  }
};
</script>

<style scoped>
.game-hand {
  /* display: flex; */
  /* justify-content: center;
  align-items: center; */
  /* flex-direction: row; */
  position: relative;
  /* width: max-content; */
  /* margin: auto; */
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
.result-button {
  /* background: #e4c580; */
  /* border-radius: 1%; */
  /* position: absolute; */
  z-index: 1;
  text-align: center;
  font-weight: bold;
  /* left: 50%;
  top: 50%;
  z-index: 1;
  margin-bottom: -50%;
  transform: translate(-50%, -50%); */
}
.deal-enter-active {
  animation: deal 0.3s;
}
.deal-leave-active {
  animation: deal 0.3s reverse;
  animation-duration: 0;
}
/* .deal-leave-active {
  animation-duration: 0;
} */
@keyframes deal {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0);
  }
}
.total-enter-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.hand-side {
  display: flex;
  justify-content: center;
}
</style>
