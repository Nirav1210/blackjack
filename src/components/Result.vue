<template>
  <transition name="bounce">
    <div v-if="isDisplayed" key="result" :class="result" class="score-circle">
      <div>{{ result }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Card",
  props: {
    result: String,
    isDisplayed: Boolean
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
@import "../style.less";
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
