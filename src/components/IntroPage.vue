<template>
  <div class="intro">
    <img class="icon" alt="game-icon" src="../assets/game-logo.png" />
    <Button button-name="PLAY" @click.native="$emit('show-game')"></Button>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "IntroPage",
  components: {
    Button
  },
  props: {
    result: String,
    isDisplayed: Boolean
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
.intro {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.icon {
  width: 15em;
}
</style>
