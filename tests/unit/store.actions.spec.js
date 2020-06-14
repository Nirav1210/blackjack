import actions from "../../src/store/actions";
import blackjack from "../../src/library/blackjack";

jest.useFakeTimers();
let commit = jest.fn();
let dispatch = jest.fn();

describe.only("actions", () => {
  beforeEach(() => {
    commit.mockClear();
    dispatch.mockClear();
    blackjack.checkResult.mockClear();
  });
  describe("Given that action `initGame` is dispatched", () => {
    const { initGame } = actions;
    it("should commit RESET_BANK mutation", () => {
      initGame({ commit, dispatch });
      expect(commit).toBeCalledWith("RESET_BANK");
    });
    it("should commit RESET_SHOE mutation", () => {
      initGame({ commit, dispatch });
      expect(commit).toBeCalledWith("RESET_SHOE");
    });
    it("should dispatch resetRound action", () => {
      initGame({ commit, dispatch });
      expect(dispatch).toBeCalledWith("resetRound");
    });
  });
  describe("Given that action `reshuffle` is dispatched", () => {
    const { reshuffle } = actions;
    const state = {
      shoe: [],
      gameSettings: { nbDecks: 6, shoeReshuffleAfter: 0.5 }
    };
    const halfOfTotal = (52 * 6) / 2;
    it("shoud commit RESET_SHOE after remaining cards are half of initial count", () => {
      state.shoe = Array(halfOfTotal).fill({ value: "2", suit: "spade" });
      reshuffle({ commit, state });
      expect(commit).toBeCalledWith("RESET_SHOE");
    });
    it("should not commits RESET_SHOE if remaining cards are more than half of initial count", () => {
      state.shoe = Array(halfOfTotal + 1).fill({ value: "2", suit: "club" });
      reshuffle({ commit, state });
      expect(commit).not.toHaveBeenCalled();
    });
  });
  describe("Given that action `dealHand` is dispatched", () => {
    const { dealHand } = actions;
    const state = {
      hands: [{ bet: null }, { bet: null }]
    };
    it("shoud not commit DEAL_CARD if there is no bet", () => {
      dealHand({ commit, state });
      jest.runAllTimers();
      expect(commit).not.toHaveBeenCalled();
    });
    it("should commit DEAL_CARD 4 times when there is a bet", () => {
      state.hands[1].bet = 1;
      dealHand({ commit, state });
      jest.runAllTimers();
      expect(commit).toBeCalledWith("DEAL_CARD", 1);
      expect(commit).toBeCalledWith("DEAL_CARD", 0);
      expect(commit).toBeCalledWith("DEAL_CARD", 1);
      expect(commit).toBeCalledWith("DEAL_CARD", 0);
    });
    it("should commit STAND for dealer hand after initial hands are dealt", () => {
      dealHand({ commit, state });
      expect(commit).toBeCalledWith("STAND", 0);
    });
    it("should commit SET_IS_DEALING to true", () => {
      dealHand({ commit, state });
      expect(commit).toBeCalledWith("SET_IS_DEALING", { isDealing: true });
    });
  });
  describe("Given that action `hit` is dispatched", () => {
    const { hit } = actions;
    const state = {
      hands: [{ cards: [{}, {}] }, { cards: [{}, {}] }]
    };
    blackjack.checkResult = jest.fn().mockReturnValue(blackjack.RESULTS.BUST);
    it("shoud commit DEAL_CARD", () => {
      hit({ state, commit, dispatch }, 1);
      expect(commit).toBeCalledWith("DEAL_CARD", 1);
    });
    it("shoud call blackjack.checkResult", () => {
      hit({ state, commit, dispatch }, 1);
      const hand1 = state.hands[0].cards;
      const hand2 = state.hands[1].cards;
      expect(blackjack.checkResult).toBeCalledWith(hand1, hand2);
    });
    it("should commit SET_RESULTS if player's hand is busted", () => {
      hit({ state, commit, dispatch }, 1);
      jest.runAllTimers();
      expect(commit).toBeCalledWith("SET_RESULTS", {
        result: blackjack.RESULTS.BUST,
        handIndex: 1
      });
    });
    it("should dispatch endRound if player's hand is busted", () => {
      hit({ state, commit, dispatch }, 1);
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith("endRound");
    });
  });
  describe("Given that action `stand` is dispatched", () => {
    const { stand } = actions;
    const state = { activeHandIndex: null };
    it("shoud commit STAND", () => {
      stand({ state, commit, dispatch }, 10);
      expect(commit).toBeCalledWith("STAND", 10);
    });
    it("should not dispatch playDealerHand if it is not a dealer's turn to play", () => {
      state.activeHandIndex = 2;
      stand({ state, commit, dispatch }, 1);
      jest.runAllTimers();
      expect(dispatch).not.toHaveBeenCalled();
    });
    it("should dispatch playDealerHand if it is a dealer's turn to play", () => {
      state.activeHandIndex = 0;
      stand({ state, commit, dispatch }, 5);
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith("playDealerHand");
    });
  });
  describe("Given that action `playDealerHand` is dispatched", () => {
    const { playDealerHand } = actions;
    const state = {
      hands: [{ cards: [{}, {}] }, { cards: [{}, {}] }, { cards: [{}, {}] }]
    };
    it("should dispatch makeDecision for every player hand", () => {
      playDealerHand({ state, dispatch });
      jest.runAllTimers();
      expect(dispatch).toBeCalledWith("makeDecision", {
        dealerHand: state.hands[0].cards,
        playerHand: state.hands[1].cards,
        handIndex: 1
      });
      expect(dispatch).toBeCalledWith("makeDecision", {
        dealerHand: state.hands[0].cards,
        playerHand: state.hands[2].cards,
        handIndex: 2
      });
    });
  });
  describe("Given that action `makeDecision` is dispatched", () => {
    const { makeDecision } = actions;
    let dealerHand, playerHand = { cards: [{}, {}] };
    it("should call blackjack.checkResult if dealer's hand total is greater than 17", () => {
      blackjack.getHandTotal = jest.fn().mockReturnValue(20);
      makeDecision(
        { commit, dispatch },
        {
          dealerHand: dealerHand,
          playerHand: playerHand,
          handIndex: 1
        }
      );
      jest.runAllTimers();
      expect(blackjack.checkResult).toBeCalledWith(dealerHand, playerHand);
    });
    it("should commit DEAL_CARD if dealer's hand total is less than 17", () => {
      blackjack.checkResult = jest.fn().mockReturnValue();
      blackjack.getHandTotal = jest.fn().mockReturnValue(10);
      makeDecision(
        { commit, dispatch },
        {
          dealerHand: dealerHand,
          playerHand: playerHand,
          handIndex: 6
        }
      );
      jest.runAllTimers();
      expect(commit).toBeCalledWith("DEAL_CARD", 0);
      expect(dispatch).toBeCalledWith("stand", 6);
    });
    it("should commit SET_RESULTS if result is out", () => {
      blackjack.checkResult = jest.fn().mockReturnValue(blackjack.RESULTS.WIN);
      blackjack.getHandTotal = jest.fn().mockReturnValue(18);
      makeDecision(
        { commit, dispatch },
        {
          dealerHand: dealerHand,
          playerHand: playerHand,
          handIndex: 6
        }
      );
      jest.runAllTimers();
      expect(commit).toBeCalledWith("SET_RESULTS", { result: blackjack.RESULTS.WIN, handIndex: 6 });
      expect(dispatch).toBeCalledWith("endRound");
    });
  });
  describe("Given that action `endRound` is dispatched", () => {
    const { endRound } = actions;
    const state = {
      hands: [{ result: null }, { result: blackjack.RESULTS.WIN }, { result: blackjack.RESULTS.LOSE }]
    };
    it("should commit ROUND_OVER and dispatch resetRound if all hands are standing", () => {
      endRound({ state, commit, dispatch });
      jest.runAllTimers();
      expect(commit).toBeCalledWith("ROUND_OVER");
      expect(dispatch).toBeCalledWith("resetRound");
    });
    it("should not commit ROUND_OVER and dispatch resetRound if not all but only some hands are standing", () => {
      state.hands[2].result = null;
      endRound({ state, commit, dispatch });
      jest.runAllTimers();
      expect(commit).not.toHaveBeenCalled();
      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});
