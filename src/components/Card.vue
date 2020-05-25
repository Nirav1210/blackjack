<template>
  <div class="playing-card">
    <section class="cards">
      <section v-if="isFaceDown" class="card card--down"></section>
      <section v-else :class="getCardClasses" :value="cardValue"></section>
    </section>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    cardValue: String,
    cardSuit: String,
    isFaceDown: Boolean
  },
  computed: {
    getCardValue() {
      return this.isFaceDown ? null : this.cardValue;
    },
    getCardClasses() {
      switch (this.cardSuit) {
        case "spade":
          return "card card--spade";
        case "heart":
          return "card card--heart";
        case "diamond":
          return "card card--diamond";
        case "club":
          return "card card--club";
        default:
          return "card card--down";
      }
    }
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
@import "../style.less";
</style>
