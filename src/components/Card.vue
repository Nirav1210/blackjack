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
  max-width: 100%;
  max-height: 100%;
}
.playing-card {
  width: 10%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
