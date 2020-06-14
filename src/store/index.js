import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
Vue.use(Vuex);

const state = {
  gameSettings: {
    nbDecks: 6,
    startingBank: 20,
    shoeReshuffleAfter: 0.5,
    minimumBet: 1,
    nbHands: 2 // includes dealer's hand
  },
  bank: [],
  shoe: [],
  hands: [],
  isRoundOver: false,
  activeHandIndex: null,
  isDealing: false
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
