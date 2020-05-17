<template>
  <div class="playing-card">
    <section class="cards">
      <section :class="getCardClasses" :value="cardValue"></section>
    </section>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    cardValue: String,
    cardSuit: String
  },
  computed: {
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
          return "card";
      }
    }
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
@import "../style.less";
</style>
