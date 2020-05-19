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
@media only screen and (max-width: 840px) {
  body {
    font-size: 0.8rem;
  }
}
@media only screen and (max-width: 668px) {
  body {
    font-size: 0.6rem;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
