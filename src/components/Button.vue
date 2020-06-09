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
@color0: #0677a1;
@color1: #eae7dc;
@color2: #1f2833;

.default-button {
  height: 2em;
  display: flex;
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.5em 1em;
  border: 0.1em solid @color0;
  border-radius: 0.5em;
  color: @color1;
  background-color: @color0;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
  min-width: 5em;
  margin: 0.5em;

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &:hover {
    color: @color2;
    background-color: @color1;
    border: 0.1em solid @color2;
    cursor: pointer;
  }
}
@media all and (max-width: 30em) {
  .default-button {
    display: block;
    margin: 0.4em auto;
  }
}
</style>
