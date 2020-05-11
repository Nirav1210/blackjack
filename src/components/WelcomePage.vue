<template>
  <div class="welcome">
    <div class="context">
      <div :class="getIntroClasses">
        <div class="image-blackjack">
          <img
            alt="blackjack logo"
            src="../assets/blackjack-logo.png"
            width="200px"
          />
        </div>
        <Button
          v-if="!showGame"
          button-name="Click to Play!"
          @click.native="displayGame()"
        ></Button>
      </div>
      <div :class="getGameClasses">
        <GamePage />
      </div>
    </div>
    <!-- Area is created to have an animaed background -->
    <div class="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import GamePage from "./GamePage.vue";

export default {
  name: "WelcomePage",
  components: {
    Button,
    GamePage
  },
  props: {
    msg: String
  },
  data: () => {
    return {
      showGame: false
    };
  },
  computed: {
    getIntroClasses() {
      if (this.showGame) {
        return "intro shrinked-intro";
      }
      return "intro";
    },
    getGameClasses() {
      if (this.showGame) {
        return "game expanded-game";
      }
      return "game";
    }
  },
  methods: {
    displayGame() {
      this.showGame = true;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Exo:400,700");

* {
  margin: 0px;
  padding: 0px;
}

.context {
  width: 100%;
  position: absolute;
  top: 30vh;
  display: flex;
}

.game {
  transition: width 2s ease;
  width: 0%;
}

.expanded-game {
  width: 75%;
}

.intro {
  width: 100%;
  transition: width 2s ease;
}

.shrinked-intro {
  width: 20%;
}

.area {
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  width: 100%;
  height: 98vh;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>
