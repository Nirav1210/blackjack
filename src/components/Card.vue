<template>
  <div class="playing-card">
    <section class="cards">
      <section v-if="isFaceDown" class="card card--down"></section>
      <section
        v-else
        class="card"
        :class="getCardClasses"
        :value="cardValue"
      ></section>
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
    getCardClasses() {
      switch (this.cardSuit) {
        case "spade":
          return "card--spade";
        case "heart":
          return "card--heart";
        case "diamond":
          return "card--diamond";
        case "club":
          return "card--club";
        default:
          return "card--down";
      }
    }
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
@import "../style/style.less";
</style>
