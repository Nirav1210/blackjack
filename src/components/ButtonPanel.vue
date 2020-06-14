<template>
  <div class="button-panel">
    <Button
      :is-enabled="isDealing && activeHandIndex != 0"
      button-name="STAND"
      @click.native="onStand()"
    />
    <Button
      :is-enabled="isDealing && activeHandIndex != 0"
      button-name="HIT"
      @click.native="onHit()"
    />
  </div>
</template>

<script>
import Button from "./Button.vue";
import { mapState } from "vuex";
export default {
  name: "ButtonPanel",
  components: {
    Button
  },
  data: () => {
    return {
      dealersTurn: false
    };
  },
  computed: {
    ...mapState(["isDealing", "bank", "activeHandIndex"])
  },
  methods: {
    onHit() {
      this.$store.dispatch("hit", 1);
    },
    onStand() {
      this.$store.dispatch("stand", 1);
    }
  }
};
</script>

<style scoped rel="stylesheet/less" lang="less">
.button-panel {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0.1em;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
