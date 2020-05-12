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
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
