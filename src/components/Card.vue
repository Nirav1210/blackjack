<template>
  <div class="playing-card">
    <section class="cards">
      <section :class="getCardClasses" :value="getCardValue"></section>
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
          return this.isFaceDown ? "card card--down" : "card card--spade";
        case "heart":
          return this.isFaceDown ? "card card--down" : "card card--heart";
        case "diamond":
          return this.isFaceDown ? "card card--down" : "card card--diamond";
        case "club":
          return this.isFaceDown ? "card card--down" : "card card--club";
        default:
          return "card";
      }
    }
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
@import "../style.less";
</style>
