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
import { mapState, mapGetters } from "vuex";
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

<style scoped>
.button-panel {
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 1%;
  left: 50%;
  right: 50%;
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
