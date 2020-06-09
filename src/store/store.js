import Vue from "vue";
import Vuex from "vuex";
import {
  createShoe,
  getHandTotal,
  checkResult,
  RESULT_TYPES
} from "../blackjack";

Vue.use(Vuex);

const DEFAULT_DELAY = 500;
const BASE_HAND = {
  cards: [],
  bet: null,
  result: null,
  score: null
};
const clone = obj => JSON.parse(JSON.stringify(obj));

// Button disable
// bank animation
// tests

// when to thinking of vuex, first thought would be - what states do I have?
// bank balance
// result of every game - (so that we can show stats (scores for both, money lost, final result, % of winning based on number of rounds played))
// pop up the result (new component) -  when click on button `end game` or button `show stats`
// maybe - compute result (of the game)
// next app idea - stock portfolio tracker

export default new Vuex.Store({
  state: {
    gameSettings: {
      nbDecks: 6,
      startingBank: 20,
      shoeReshuffleAfter: 0.5,
      minimumBet: 1
    },
    bank: 0,
    shoe: [],
    hands: [clone(BASE_HAND), clone(BASE_HAND)],
    roundOver: false,
    activeHandIndex: null,
    isDealing: null
  },
  mutations: {
    RESET_SHOE(state) {
      state.shoe = createShoe();
    },
    RESET_BANK(state) {
      state.bank = state.gameSettings.startingBank;
    },
    RESET_HANDS(state) {
      state.hands = [clone(BASE_HAND), clone(BASE_HAND)];
    },
    DEAL_CARD(state, handIndex) {
      state.hands[handIndex].cards.push(state.shoe.shift());
    },
    BET(state) {
      if (state.bank < state.gameSettings.minimumBet) return;
      state.bank -= state.gameSettings.minimumBet;
      state.hands.forEach(hand => {
        hand.bet = state.gameSettings.minimumBet;
      });
    },
    STAND(state, handIndex) {
      if (state.hands.length - 1 > handIndex) {
        state.activeHandIndex = handIndex + 1;
      } else {
        state.activeHandIndex = 0;
      }
    },
    SET_RESULTS(state, { result, handIndex }) {
      state.hands[handIndex].result = result.result;
      state.hands[handIndex].score = result.score;
      state.bank += state.hands[handIndex].bet * result.score;
    },
    ROUND_OVER(state) {
      state.roundOver = true;
    },
    RESET_ROUND(state) {
      state.roundOver = false;
      state.activeHandIndex = null;
    }
  },
  actions: {
    initGame(context) {
      context.commit("RESET_BANK");
      context.commit("RESET_SHOE");
      context.dispatch("resetRound");
    },
    resetRound(context) {
      context.commit("RESET_HANDS");
      context.commit("RESET_ROUND");
      context.dispatch("reshuffle");
      setTimeout(() => {
        context.commit("BET");
        context.dispatch("startRound");
      }, DEFAULT_DELAY * 2);
    },
    reshuffle({ commit, state }) {
      const remainingSize = state.shoe.length;
      const totalCards = state.gameSettings.nbDecks * 52;
      const shoeUsedSize = 1 - remainingSize / totalCards;
      if (shoeUsedSize >= state.gameSettings.shoeReshuffleAfter) {
        commit("RESET_SHOE");
      }
    },
    startRound({ dispatch }) {
      dispatch("dealHand");
    },
    dealHand({ commit, state }) {
      if (!state.hands[1].bet) return;
      const dealQueue = [1, 0, 1, 0]; // player, dealer, player, dealer
      dealQueue.forEach((handIndex, i) => {
        setTimeout(() => {
          commit("DEAL_CARD", handIndex);
        }, DEFAULT_DELAY * (i + 1));
      });
      // after cards are dealt the dealer should stand
      commit("STAND", 0);
    },
    hit({ state, commit, dispatch }, handIndex) {
      commit("DEAL_CARD", handIndex);
      const hand1 = state.hands[0].cards;
      const hand2 = state.hands[handIndex].cards;
      const result = checkResult(hand1, hand2);
      if (result.result == RESULT_TYPES.BUST) {
        commit("SET_RESULTS", { result, handIndex });
        dispatch("endRound");
      }
    },
    stand({ state, commit, dispatch }, handIndex) {
      commit("STAND", handIndex);
      if (state.activeHandIndex == 0) {
        setTimeout(() => {
          dispatch("playDealerHand");
        }, DEFAULT_DELAY * 2);
      }
    },
    playDealerHand({ state, dispatch }) {
      let clone = state.hands.slice();
      let dealerHand = clone.shift();
      clone.forEach((hand, index) => {
        dispatch("makeDecision", {
          dealerHand: dealerHand.cards,
          playerHand: hand.cards,
          handIndex: index + 1
        });
      });
    },
    makeDecision({ commit, dispatch }, { dealerHand, playerHand, handIndex }) {
      let result = null;
      if (getHandTotal(dealerHand) >= 17) {
        result = checkResult(dealerHand, playerHand);
      } else {
        commit("DEAL_CARD", 0);
        dispatch("stand", handIndex);
      }
      if (result) {
        console.log("makeDecision", result.result, handIndex);
        commit("SET_RESULTS", { result, handIndex });
        dispatch("endRound");
      }
    },
    endRound({ state, commit, dispatch }) {
      let clone = state.hands.slice();
      clone.shift();
      // if result for all players is out then end round
      const anyPlayersStanding = clone.some(hand => hand.result == null);
      if (!anyPlayersStanding) {
        commit("ROUND_OVER");
        setTimeout(() => {
          dispatch("resetRound");
        }, DEFAULT_DELAY * 5);
      }
    }
  },
  getters: {
    getTotal: state => handIndex => {
      return getHandTotal(state.hands[handIndex].cards).toString();
    }
  }
});
