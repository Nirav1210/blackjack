<template>
  <div class="button-panel">
    <Button
      :is-enabled="!dealersTurn"
      button-name="STAND"
      @click.native="onStand()"
    ></Button>
    <div class="bank">
      <Chip color="orange"></Chip>
      <p>x {{ bank }}</p>
    </div>
    <Button
      :is-enabled="!dealersTurn"
      button-name="HIT"
      @click.native="onHit()"
    ></Button>
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
import { mapState } from "vuex";
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
  data: () => {
    return {
      dealersTurn: false
    };
  },
  computed: {
    ...mapState(["isDealing", "bank", "activeHandIndex"])
  },
  methods: {
    onHit() {
      this.$store.dispatch("hit", 1);
    },
    onStand() {
      this.$store.dispatch("stand", 1);
    },
    isPlayerTurn() {
      // return !this.isDealing && this.activeHandIndex > 0;
    }
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
.button-panel {
  bottom: 1%;
  display: flex;
  justify-content: center;
  left: 50%;
  position: absolute;
  right: 50%;
}
.bank {
  align-items: center;
  background-color: #1f2833;
  border-radius: 2em;
  color: #eae7dc;
  display: flex;
  height: 3em;
  justify-content: center;
  min-width: 10em;
  padding: 0.2em;
}
</style>
