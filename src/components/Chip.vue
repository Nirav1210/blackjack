<template>
  <div>
    <div class="chip flat">
      <p>{{ score }}</p>
    </div>
    <!-- <img alt="chip icon" src="../assets/casino-chip.png" /> -->
  </div>
</template>

<script>
export default {
  name: "ScoreCard",
  props: {
    score: Number
  }
};
</script>

<style scoped>
.chip {
  margin: 0.5em;
  /* font-size: 1.2em; */
  position: relative;
  /* display: inline-block; */
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 5em;
  height: 5em;
  background: #1f2833;
  border-radius: 50%;
  /* position: relative; */
  border: 0.5em dashed #eae7dc;
  transition: all 0.5s ease;
  /* backface-visibility: hidden; */
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

.chip.flat {
  box-shadow: 0 0 0 0.2em #fff;
}
</style>
