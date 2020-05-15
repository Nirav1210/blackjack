<template>
  <div class="button-panel">
    <div class="buttons">
      <Button button-name="Double Down"></Button>
    </div>
    <div class="buttons">
      <Button button-name="Split"></Button>
    </div>
    <div class="buttons">
      <Button button-name="Stand"></Button>
    </div>
    <div class="buttons">
      <Button button-name="Hit!"></Button>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "ButtonPanel",
  components: {
    Button
  },
  props: {
    userName: String
  }
};
</script>

<style scoped>
.button-panel {
  display: flex;
}
.buttons {
  margin: 0 10px;
  width: 25%;
  height: 100%;
}
</style>
