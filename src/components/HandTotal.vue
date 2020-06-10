<template>
  <div v-if="score > 0" class="score-bubble">{{ score }}</div>
</template>

<script>
export default {
  name: "HandTotal",
  props: {
    score: String
  }
};
</script>

<style rel="stylesheet/less" lang="less">
@color: #0677a1;

.score-bubble {
  background-color: @color;
  border-radius: 1em;
  border: 0.1em solid @color;
  color: #eae7dc;
  font-weight: bold;
  height: 1.5em;
  padding: 0.4em;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 1.5em;
}
</style>
