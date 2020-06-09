<template>
  <div id="app">
    <WelcomePage />
  </div>
</template>

<script>
import WelcomePage from "./components/Welcome.vue";

export default {
  name: "App",
  components: {
    WelcomePage
  }
};
</script>

<style rel="stylesheet/less" lang="less">
@import "./style.less";
</style>
