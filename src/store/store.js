import Vue from "vue";
import Vuex from "vuex";
import {
  createShoe,
  getHandTotal,
  checkResult,
  RESULT_TYPES,
  RESULT_SCORE
} from "../blackjack";

Vue.use(Vuex);

const DEFAULT_DELAY = 500;
const BASE_HAND = {
  cards: [],
  bet: null,
  result: null,
  score: null,
  isStanding: false
};
const clone = obj => JSON.parse(JSON.stringify(obj));

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
      startingBank: 500,
      shoeReshuffleAfter: 0.5,
      minimumBet: 20
    },
    bank: 0,
    shoe: [],
    hands: [clone(BASE_HAND), clone(BASE_HAND)],
    // playerHand: clone(BASE_HAND),
    // dealerHand: clone(BASE_HAND),
    // isDealersTurn: false,
    roundOver: false
  },
  // mutations are synchronous
  // Always put mutations within actions - to future proof an app, to incresse scalability
  mutations: {
    RESET_SHOE(state) {
      state.shoe = createShoe();
    },
    RESET_BANK(state) {
      state.bank = state.gameSettings.startingBank;
    },
    RESET_HANDS(state) {
      state.hands = [clone(BASE_HAND), clone(BASE_HAND)];
      // state.playerHand = clone(BASE_HAND);
      // state.dealerHand = clone(BASE_HAND);
    },
    DEAL_CARD(state, handIndex) {
      state.hands[handIndex].cards.push(state.shoe.shift());
    },
    // DEAL_DEALER(state) {
    //   state.dealerHand.cards.push(state.shoe.shift());
    // },
    BET(state) {
      if (state.bank < state.gameSettings.minimumBet) return;
      state.bank -= state.gameSettings.minimumBet;
      state.hands.forEach(hand => {
        hand.bet = state.gameSettings.minimumBet;
      });
    },
    STAND(state, handIndex) {
      // state.isDealersTurn = true;
      state.hands[handIndex].isStanding = true;
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
      // state.hands.forEach(hand => {
      //   hand.isStanding = false;
      // });
      // state.isDealersTurn = false;
    }
  },
  // we will have to dispatch action like this.$store.dispatch('fetchTodos')
  // actions are asynchronous
  // actions can wrap business logic around mutations
  // context object is an object that contains all the properties on
  // the vuex store such as state, commit and getters
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
      context.commit("BET");
      setTimeout(() => {
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
      for (let i = 0; i < 2; i++) {
        state.hands.forEach((hand, index) => {
          if (!hand.bet) return;
          commit("DEAL_CARD", index);
        });
      }
      // after cards are dealt the dealer should be standing in the beginning
      commit("STAND", 0);
    },
    hit({ state, commit, dispatch }, handIndex) {
      commit("DEAL_CARD", handIndex);
      const hand1 = state.hands[0].cards;
      const hand2 = state.hands[handIndex].cards;
      // dispatch("makeDecision", { hand1, hand2, handIndex });
      const result = checkResult(hand1, hand2);
      if (result.result == RESULT_TYPES.BUST) {
        commit("SET_RESULTS", { result, handIndex });
        dispatch("endRound");
      }
    },
    stand({ state, commit, dispatch }, handIndex) {
      commit("STAND", handIndex);
      // start dealer's turn if all player are standing
      const allPlayersStanding = state.hands.every(hand => hand.isStanding);
      if (allPlayersStanding) {
        dispatch("playDealerHand");
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
    getPlayerTotal(state) {
      return getHandTotal(state.hands[1].cards);
    },
    getDealerTotal(state) {
      return getHandTotal(state.hands[0].cards);
    }
    // // nested getters (getter as an argument)
    // activeTodosCount: (state, getters) => {
    //   return state.todos.length - getters.doneTodos.length;
    // },
    // // dynamic getter
    // getTodosById: state => id => {
    //   return state.todos.find(todo => todo.id === id);
    // }
  }
});
