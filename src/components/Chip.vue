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

<style scoped rel="stylesheet/less" lang="less">
.chip {
  background: #af1124;
  border-radius: 50%;
  border: 0.1em dashed #eae7dc;
  box-shadow: 0 0 0 0.2em #ffffff;
  box-sizing: border-box;
  font-size: 1em;
  height: 2em;
  margin: 0.5em;
  position: relative;
  transition: all 0.5s ease;
  width: 2em;
}
div.chip {
  p {
    color: white;
    font-size: 0.9em;
    left: 50%;
    margin-right: -50%;
    margin: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
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
