<template>
  <div class="button-panel">
    <Button
      :is-enabled="isDealing && activeHandIndex != 0"
      button-name="STAND"
      @click.native="onStand()"
    />
    <Chip class="bank" color="orange" :quantity="bank"></Chip>
    <Button
      :is-enabled="isDealing && activeHandIndex != 0"
      button-name="HIT"
      @click.native="onHit()"
    />
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
    }
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
.button-panel {
  bottom: 1%;
  display: flex;
  justify-content: center;
}
.bank {
  align-items: center;
  background-color: #1f2833;
  border-radius: 2em;
  color: #eae7dc;
  display: flex;
  height: 3em;
  justify-content: center;
  min-width: 5em;
  padding: 0.2em;
}
</style>
