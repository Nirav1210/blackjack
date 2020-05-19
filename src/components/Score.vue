<template>
  <div class="score-bubble">{{ score }}</div>
</template>

<script>
export default {
  name: "ScoreBubble",
  props: {
    score: String
  }
};
</script>

<style scoped>
.score-bubble {
  padding: 0.4em;
  color: #eae7dc;
  background-color: #1f2833;
  border: 0.1em solid #1f2833;
  border-radius: 1em;
  text-align: center;
}
</style>
