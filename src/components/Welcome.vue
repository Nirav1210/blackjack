<template>
  <div class="welcome">
    <div class="context">
      <transition name="fade" mode="out-in">
        <GamePage v-if="startGame" class="game" key="game" />
        <IntroPage v-else key="intro" @show-game="startGame = true" />
      </transition>
    </div>
    <!-- Area is created to have an animated background -->
    <div class="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import IntroPage from "./IntroPage.vue";
import GamePage from "./GamePage.vue";

export default {
  name: "WelcomePage",
  components: {
    IntroPage,
    GamePage
  },
  data: () => {
    return {
      startGame: false
    };
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
@import "../style/style.less";

.context {
  height: 100%;
  position: absolute;
  width: 100%;
}
.fade-enter-active {
  transition: opacity 0.8s;
}
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>
