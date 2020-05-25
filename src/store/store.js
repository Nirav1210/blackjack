import Vue from "vue";
import Vuex from "vuex";
import {
  createShoe,
  getHandTotal,
  RESULT_TYPES,
  RESULT_SCORE
} from "../blackjack";

Vue.use(Vuex);

const DEFAULT_DELAY = 500;
const BASE_HAND = {
  cards: [],
  bets: [],
  result: null
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
    playerHand: clone(BASE_HAND),
    dealerHand: clone(BASE_HAND),
    isDealersTurn: false,
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
      state.playerHand = clone(BASE_HAND);
      state.dealerHand = clone(BASE_HAND);
    },
    DEAL_PLAYER(state) {
      state.playerHand.cards.push(state.shoe.shift());
    },
    DEAL_DEALER(state) {
      state.dealerHand.cards.push(state.shoe.shift());
    },
    BET(state) {
      if (state.bank < state.gameSettings.minimumBet) return;
      state.bank -= state.gameSettings.minimumBet;
      //   const bets = [state.gameSettings.minimumBet];
      state.playerHand.bets[0] = state.gameSettings.minimumBet;
    },
    STAND(state) {
      state.isDealersTurn = true;
    },
    SET_RESULTS(state, { dealer, player, result }) {
      state.playerHand.result = player;
      state.dealerHand.result = dealer;
      state.roundOver = true;
      state.bank += state.playerHand.bets[0] * result;
    }
  },
  //   we will have to dispatch action like this.$store.dispatch('fetchTodos')
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
      context.dispatch("reshuffle");
      context.commit("BET");
      context.dispatch("dealRound");
    },
    reshuffle({ commit, state }) {
      const remainingSize = state.shoe.length;
      const totalCards = state.gameSettings.nbDecks * 52;
      const shoeUsedSize = 1 - remainingSize / totalCards;
      if (shoeUsedSize >= state.gameSettings.shoeReshuffleAfter) {
        commit("RESET_SHOE");
      }
    },
    dealRound({ commit, state, dispatch }) {
      // check if there is a bet
      if (!state.playerHand.bets[0]) return;
      for (let i = 0; i < 2; i++) {
        commit("DEAL_PLAYER");
        commit("DEAL_DEALER");
      }
      //   setTimeout(() => {
      //     dispatch("startRound");
      //   }, DEFAULT_DELAY * 5);
    },
    hit({ commit, dispatch }) {
      commit("DEAL_PLAYER");
      dispatch("isPlayerBust");
    },
    stand({ commit, dispatch }) {
      commit("STAND");
      dispatch("playDealersHand");
    },
    isPlayerBust({ commit, getters }) {
      if (getters.getPlayerTotal > 21) {
        commit("SET_RESULTS", {
          dealer: RESULT_TYPES.WIN,
          player: RESULT_TYPES.BUST,
          result: RESULT_SCORE.BUST
        }); // Dealer won!, player bust
      }
    },
    playDealersHand({ commit, getters, dispatch }) {
      commit("DEAL_DEALER");
      if (getters.getDealerTotal >= 17) {
        dispatch("isStandOff");
        dispatch("isDealerBust");
        dispatch("isPlayerWon");
        dispatch("isDealerWon");
      } else {
        dispatch("stand");
      }
    },
    isStandOff({ commit, state, getters }) {
      const player = getters.getPlayerTotal;
      const dealer = getters.getDealerTotal;
      if (!state.roundOver && player === dealer) {
        commit("SET_RESULTS", {
          dealer: RESULT_TYPES.STANDOFF,
          player: RESULT_TYPES.STANDOFF,
          result: RESULT_SCORE.STANDOFF
        }); // standoff
      }
    },
    isDealerBust({ commit, state, getters }) {
      if (!state.roundOver && getters.getDealerTotal > 21) {
        commit("SET_RESULTS", {
          dealer: RESULT_TYPES.BUST,
          player: RESULT_TYPES.WIN,
          result: RESULT_SCORE.WIN
        }); // Dealer bust!, player won
      }
    },
    isPlayerWon({ commit, state, getters }) {
      const player = getters.getPlayerTotal;
      const dealer = getters.getDealerTotal;
      if (!state.roundOver && player <= 21) {
        if (player > dealer) {
          if (player == 21) {
            if (state.playerHand.cards.length == 2) {
              commit("SET_RESULTS", {
                dealer: RESULT_TYPES.LOSE,
                player: RESULT_TYPES.BLACKJACK,
                result: RESULT_SCORE.BLACKJACK
              }); // player blackjack
            }
          } else {
            commit("SET_RESULTS", {
              dealer: RESULT_TYPES.LOSE,
              player: RESULT_TYPES.WIN,
              result: RESULT_SCORE.WIN
            }); // player win
          }
        }
      }
    },
    isDealerWon({ commit, state, getters }) {
      const player = getters.getPlayerTotal;
      const dealer = getters.getDealerTotal;
      if (!state.roundOver && dealer <= 21) {
        if (dealer > player) {
          if (dealer == 21) {
            if (state.dealerHand.cards.length == 2) {
              commit("SET_RESULTS", {
                dealer: RESULT_TYPES.BLACKJACK,
                player: RESULT_TYPES.LOSE,
                result: RESULT_SCORE.LOSE
              }); // dealer blackjack
            }
          } else {
            commit("SET_RESULTS", {
              dealer: RESULT_TYPES.WIN,
              player: RESULT_TYPES.LOSE,
              result: RESULT_SCORE.LOSE
            }); // dealer won
          }
        }
      }
    }
  },
  getters: {
    getPlayerTotal(state) {
      return getHandTotal(state.playerHand.cards);
    },
    getDealerTotal(state) {
      return getHandTotal(state.dealerHand.cards);
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
