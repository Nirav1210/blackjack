<template>
  <div class="button-panel">
    <Button button-name="STAND" @click.native="onStand()"></Button>
    <div class="bank">
      <Chip color="orange" :value="10"></Chip>
      <p>x {{ numberOfChips }}</p>
    </div>
    <Button button-name="HIT" @click.native="onHit()"></Button>
    <!-- <div class="buttons">
        <Button button-name="Double Down"></Button>
      </div>
      <div class="buttons">
        <Button button-name="Split Pairs"></Button>
      </div>
      <div class="buttons">
        <Button button-name="Surrender"></Button>
      </div> -->
  </div>
</template>

<script>
import Button from "./Button.vue";
import Chip from "./Chip.vue";
export default {
  name: "ButtonPanel",
  components: {
    Button,
    Chip
  },
  props: {
    numberOfChips: {
      type: Number,
      default: 20
    }
  },
  methods: {
    onHit() {
      this.$store.dispatch("hit", 1);
    },
    onStand() {
      this.$store.dispatch("stand", 1);
    }
  }
};
</script>

<style scoped>
.button-panel {
  /* margin: 0.5em;
  display: flex;
  position: relative;
  bottom: 0;
  z-index: 1;
  flex-flow: row nowrap; */
  display: flex;
  justify-content: center;
  margin: 0.5em;
}
.bank {
  min-width: 10em;
  height: 3em;
  display: flex;
  border-radius: 2em;
  justify-content: center;
  align-items: center;
  background-color: #1f2833;
  color: #eae7dc;
  padding: 0.2em;
}
</style>
