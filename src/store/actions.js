const DEFAULT_DELAY = 500;
import blackjack from "../library/blackjack";

export default {
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
    commit("SET_IS_DEALING", { isDealing: true });
  },
  hit({ state, commit, dispatch }, handIndex) {
    commit("DEAL_CARD", handIndex);
    const hand1 = state.hands[0].cards;
    const hand2 = state.hands[handIndex].cards;
    const result = blackjack.checkResult(hand1, hand2);
    if (result.result == blackjack.RESULTS.BUST.result) {
      // if player is bust end round
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
    if (blackjack.getHandTotal(dealerHand) >= 17) {
      result = blackjack.checkResult(dealerHand, playerHand);
    } else {
      commit("DEAL_CARD", 0);
      dispatch("stand", handIndex);
    }
    if (result) {
      commit("SET_RESULTS", { result, handIndex });
      dispatch("endRound");
    }
  },
  endRound({ state, commit, dispatch }) {
    let clone = state.hands.slice();
    clone.shift();
    // if result for all players is out then end the round
    const anyPlayersStanding = clone.some(hand => hand.result == null);
    if (!anyPlayersStanding) {
      commit("ROUND_OVER");
      setTimeout(() => {
        dispatch("resetRound");
      }, DEFAULT_DELAY * 5);
    }
  }
};
