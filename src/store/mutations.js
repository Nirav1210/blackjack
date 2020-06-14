import blackjack from "../library/blackjack";

const BASE_HAND = {
  cards: [],
  bet: null,
  result: null,
  score: null
};
const clone = obj => JSON.parse(JSON.stringify(obj));

export default {
  RESET_SHOE(state) {
    state.shoe = blackjack.createShoe(state.nbDecks);
  },
  RESET_BANK(state) {
    state.bank = [];
    for (let i = 0; i < state.gameSettings.nbHands; i++) {
      state.bank.push(state.gameSettings.startingBank);
    }
  },
  RESET_HANDS(state) {
    state.hands = [];
    for (let i = 0; i < state.gameSettings.nbHands; i++) {
      state.hands.push(clone(BASE_HAND));
    }
  },
  DEAL_CARD(state, handIndex) {
    state.hands[handIndex].cards.push(state.shoe.shift());
  },
  BET(state) {
    state.hands.forEach((hand, i) => {
      if (state.bank[i] < state.gameSettings.minimumBet) return;
      state.bank[i] -= state.gameSettings.minimumBet;
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
  SET_IS_DEALING(state, { isDealing }) {
    state.isDealing = isDealing;
  },
  SET_RESULTS(state, { result, handIndex }) {
    state.hands[handIndex].result = result.result;
    state.hands[handIndex].score = result.score;
    state.bank[handIndex] += state.hands[handIndex].bet * result.score;
    state.isDealing = false;
  },
  ROUND_OVER(state) {
    state.isRoundOver = true;
  },
  RESET_ROUND(state) {
    state.isRoundOver = false;
    state.activeHandIndex = null;
  }
};
