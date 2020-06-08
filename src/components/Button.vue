<template>
  <div :class="getButtonClasses">{{ buttonName }}</div>
</template>

<script>
export default {
  name: "Button",
  props: {
    buttonName: String,
    isEnabled: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    getButtonClasses() {
      return this.isEnabled ? "default-button" : "default-button disabled";
    }
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
.default-button {
  height: 2em;
  display: flex;
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.5em 1em;
  border: 0.1em solid #0677a1;
  border-radius: 0.5em;
  color: #eae7dc;
  background-color: #0677a1;
  justify-content: center;
  align-items: center;
  z-index: 1;
  min-width: 5em;
  margin: 0.5em;

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
.default-button:hover {
  color: #1f2833;
  background-color: #eae7dc;
  border: 0.1em solid #1f2833;
  cursor: pointer;
}
@media all and (max-width: 30em) {
  .default-button {
    display: block;
    margin: 0.4em auto;
  }
}
</style>
