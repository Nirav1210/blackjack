import blackjack from "../library/blackjack";

export default {
  getTotal: state => handIndex => {
    return blackjack.getHandTotal(state.hands[handIndex].cards).toString();
  }
};
