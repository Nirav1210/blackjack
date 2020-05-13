<template>
  <div class="playing-card">
    <img
      v-bind:alt="cardType"
      v-bind:src="require('../assets/' + getImagePath + '.png')"
    />
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    cardType: String
  },
  computed: {
    getImagePath() {
      return this.cardType;
    }
  }
};
</script>

<style scoped>
img {
  width: 20%;
}
.playing-card {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
