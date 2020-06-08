<template>
  <div v-if="score > 0" class="score-bubble">{{ score }}</div>
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
  width: 1.5em;
  height: 1.5em;
  color: #eae7dc;
  background-color: #0677a1;
  border: 0.1em solid #0677a1;
  border-radius: 1em;
  text-align: center;
  font-weight: bold;
}
</style>
