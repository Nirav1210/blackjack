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
    <ScoreBubble v-if="!isFaceDown" :score="getTotal(handIndex)" />
    <Result :is-displayed="handIndex != 0 && roundOver" :result="hand.result" />
  </div>
</template>

<script>
import Card from "./Card.vue";
import ScoreBubble from "./Score.vue";
import Result from "./Result.vue";

import { mapState, mapGetters } from "vuex";

export default {
  name: "GamePage",
  components: {
    Card,
    ScoreBubble,
    Result
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
  computed: {
    ...mapGetters(["getTotal"]),
    ...mapState(["hands", "roundOver", "bank"]),
    handClasses() {
      return this.handIndex == 0 ? "game-hand is-dealer" : "game-hand";
    }
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
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
.game-hand {
  position: relative;
  padding: 1em;
  transition: transform 0.2s ease;
}
.game-hand.is-dealer {
  transform: scale(0.9);
}
</style>
