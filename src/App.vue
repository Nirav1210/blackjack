<template>
  <div id="app">
    <WelcomePage />
  </div>
</template>

<script>
import WelcomePage from "./components/WelcomePage.vue";

export default {
  name: "App",
  components: {
    WelcomePage
  }
};
</script>

<style>
body {
  overflow: hidden;
  margin: 0;
  font-size: 1rem;
}
@media screen and (max-width: 570px), screen and (max-height: 570px) {
  body {
    font-size: 0.7rem;
  }
}
@media screen and (max-width: 400px), screen and (max-height: 400px) {
  body {
    font-size: 0.5rem;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
