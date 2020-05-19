<template>
  <div class="button-panel">
    <div v-if="!isResultOut">
      <div class="buttons">
        <Button button-name="Stand" @click.native="$emit('stand')"></Button>
      </div>
      <div class="buttons">
        <Button button-name="Hit!" @click.native="$emit('hit')"></Button>
      </div>
      <div class="buttons">
        <Button button-name="Double Down"></Button>
      </div>
      <div class="buttons">
        <Button button-name="Split Pairs"></Button>
      </div>
      <div class="buttons">
        <Button button-name="Surrender"></Button>
      </div>
    </div>
    <div v-if="isResultOut" class="buttons">
      <Button button-name="Reset" @click.native="$emit('newGame')"></Button>
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
    isResultOut: Boolean
  }
};
</script>

<style scoped>
.button-panel {
  margin: 0.5em;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 50%;
  z-index: 1;
  margin-bottom: -50%;
  transform: translate(0%, -50%);
}

.buttons {
  margin: 10px;
}
</style>
