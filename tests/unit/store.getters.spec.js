import getters from "../../src/store/getters";
import blackjack from "../../src/library/blackjack";

describe("getters", () => {
  let state = { hands: [{ cards: [] }] };
  describe("Given that `getTotal` getters is called", () => {
    const { getTotal } = getters;
    it("should call blackjack.getHandTotal", () => {
      blackjack.getHandTotal = jest.fn().mockReturnValue(9);
      state.hands[0].cards = [{}, {}];
      const getterFn = getTotal(state);
      const total = getterFn(0);
      expect(total).toEqual("9");
      expect(blackjack.getHandTotal).toBeCalledWith(state.hands[0].cards);
    });
  });
});
