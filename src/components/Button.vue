<template>
  <div class="default-button">{{ buttonName }}</div>
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
.default-button {
  position: relative;
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  border-radius: 0.12em;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
  z-index: 1;
}
.default-button:hover {
  color: #000000;
  background-color: #ffffff;
  cursor: pointer;
  position: relative;
}
@media all and (max-width: 30em) {
  .default-button {
    display: block;
    margin: 0.4em auto;
  }
}
</style>
