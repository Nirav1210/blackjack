<template>
  <div class="button-container">
    <div class="button bouncy">{{ buttonName }}</div>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    buttonName: String
  }
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
}
.button:hover {
  color:#000000;
  background-color: #ffffff;
}
@media all and (max-width: 30em) {
  .button {
    display: block;
    margin: 0.4em auto;
  }
}
.bouncy {
  animation: bouncy 5s infinite linear;
  position: relative;
}
@keyframes bouncy {
  0% {
    top: 0em;
  }
  40% {
    top: 0em;
  }
  43% {
    top: -0.9em;
  }
  46% {
    top: 0em;
  }
  48% {
    top: -0.4em;
  }
  50% {
    top: 0em;
  }
  100% {
    top: 0em;
  }
}
</style>
