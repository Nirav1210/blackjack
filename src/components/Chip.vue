<template>
  <div>
    <div :class="getChipClasses">
      <p>{{ value }} x {{ quantity }}</p>
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
  z-index: 1;
  font-size: 1em;
  position: relative;
  /* display: inline-block; */
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 5em;
  height: 5em;
  background: #af1124;
  border-radius: 50%;
  /* position: relative; */
  border: 0.5em dashed #eae7dc;
  transition: all 0.5s ease;
  /* backface-visibility: hidden; */
  box-shadow: 0 0 0 0.2em #fff;
}
.chip:hover {
  font-size: 1.1em;
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
