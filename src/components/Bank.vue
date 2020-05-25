<template>
  <div>
    <div class="bank">
      <Chip
        color="black"
        :value="100"
        :quantity="1"
        @click.native="betMoney(100)"
      ></Chip>
      <Chip
        color="blue"
        :value="50"
        :quantity="2"
        @click.native="betMoney(50)"
      ></Chip>
      <Chip
        color="green"
        :value="25"
        :quantity="5"
        @click.native="betMoney(25)"
      ></Chip>
      <Chip
        color="orange"
        :value="10"
        :quantity="10"
        @click.native="betMoney(10)"
      ></Chip>
    </div>
  </div>
</template>

<script>
import Chip from "./Chip.vue";
export default {
  name: "Bank",
  components: {
    Chip
  },
  props: {
    gameScore: Number
  },
  date: {
    currentBet: null,
    totalBank: null
  },
  methods: {
    betMoney(value) {
      this.$emit("bet-amount", value);
    }
  }
};
</script>

<style scoped>
.bank {
}
</style>
