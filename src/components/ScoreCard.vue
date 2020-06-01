<template>
  <div :class="result" class="score-circle">
    <div>{{ result }}</div>
  </div>
</template>

<script>
// import { RESULT_TYPES, RESULT_SCORE } from "../blackjack";
export default {
  name: "Card",
  props: {
    result: String
  },
  computed: {
    getCircleClasses() {
      // Dealer won!, player bust
      // stand off
      // player won, dealer bust
      // Black Jack! - Player
      // Player won!
      // Black Jack! - Dealer
      // Dealer won!
    }
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
@import "../style.less";
</style>
