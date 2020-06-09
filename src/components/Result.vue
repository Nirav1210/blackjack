<template>
  <transition name="bounce">
    <div v-if="isDisplayed" key="result" :class="result" class="result-bubble">
      <div>{{ result.toUpperCase() }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Result",
  props: {
    result: String,
    isDisplayed: Boolean
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
@color-win: #5dbb63;
@color-lose: #d31a38;
@color-bust: #b58b03;
@color-standoff: #fefefa;
@color-blackjack: #c1e21a;

.result-bubble {
  border-radius: 1em;
  bottom: 0.5em;
  font-size: larger;
  font-weight: 900;
  left: 0;
  margin: 0 auto;
  padding: 0.5em;
  position: absolute;
  right: 0;
  text-align: center;
  width: 50%;
  z-index: 1;
}
.win {
  background: @color-win;
  color: #fefefa;
}
.lose {
  background: @color-lose;
  color: #fefefa;
}
.bust {
  background: @color-bust;
}
.blackjack {
  background: @color-blackjack;
}
.standoff {
  background: @color-standoff;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.2s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
