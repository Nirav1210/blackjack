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
  height: 2em;
  position: relative;
  display: flex;
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.5em 1em;
  border: 0.1em solid #fdbcb4;
  border-radius: 0.5em;
  color: #008080;
  background-color: #fdbcb4;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
}
.default-button:hover {
  color: #008080;
  background-color: #f5f5f5;
  border: 0.1em solid #f5f5f5;
  cursor: pointer;
}
@media all and (max-width: 30em) {
  .default-button {
    display: block;
    margin: 0.4em auto;
  }
}
</style>
