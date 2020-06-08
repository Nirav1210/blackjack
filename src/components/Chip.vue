<template>
  <div>
    <div :class="getChipClasses">
      <!-- <p>{{ value }} x {{ quantity }}</p> -->
      <p>{{ value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chip",
  props: {
    value: Number,
    quantity: Number,
    color: String
  },
  computed: {
    getChipClasses() {
      return "chip " + this.color;
    }
  }
};
</script>

<style scoped>
.chip {
  margin: 0.5em;
  font-size: 1em;
  position: relative;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 2em;
  height: 2em;
  background: #af1124;
  border-radius: 50%;
  border: 0.1em dashed #eae7dc;
  transition: all 0.5s ease;
  box-shadow: 0 0 0 0.2em #fff;
}
div.chip p {
  margin: 0;
  color: white;
  font-size: 0.9em;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.chip.black {
  background: #1f2833;
}
.chip.blue {
  background: #045391;
}
.chip.green {
  background: #4b9e00;
}
.chip.orange {
  background: #df6301;
}
</style>
