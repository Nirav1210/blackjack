import mutations from "../../src/store/mutations";
import blackjack from "../../src/library/blackjack";

const stateMock = {
  gameSettings: {
    nbDecks: 3,
    startingBank: 20,
    shoeReshuffleAfter: 0.5,
    minimumBet: 1,
    nbHands: 3
  },
  bank: [],
  shoe: [],
  hands: [],
  isRoundOver: false,
  activeHandIndex: null,
  isDealing: false
};
const BASE_HAND = { cards: [], bet: null, result: null, score: null };
const clone = obj => JSON.parse(JSON.stringify(obj));

describe("mutations", () => {
  let state = {};
  beforeEach(() => {
    state = clone(stateMock);
  });
  describe("Given that `RESET_SHOE` mutation is commited", () => {
    const { RESET_SHOE } = mutations;
    it("should call blackjack.createShoe and set shoe", () => {
      blackjack.createShoe = jest.fn().mockReturnValue([{}, {}]);
      RESET_SHOE(state);
      expect(blackjack.createShoe).toBeCalledWith(state.nbDecks);
      expect(state.shoe).toEqual([{}, {}]);
    });
  });
  describe("Given that `RESET_BANK` mutation is commited", () => {
    const { RESET_BANK } = mutations;
    it("should set bank for every hand to startingBank", () => {
      RESET_BANK(state);
      expect(state.bank[0]).toEqual(state.gameSettings.startingBank);
      expect(state.bank[1]).toEqual(state.gameSettings.startingBank);
      expect(state.bank[2]).toEqual(state.gameSettings.startingBank);
    });
  });
  describe("Given that `RESET_HANDS` mutation is commited", () => {
    const { RESET_HANDS } = mutations;
    it("should set hands to default empty values", () => {
      RESET_HANDS(state);
      expect(state.hands).toEqual([BASE_HAND, BASE_HAND, BASE_HAND]);
    });
  });
  describe("Given that `DEAL_CARD` mutation is commited", () => {
    const { DEAL_CARD } = mutations;
    it("should take one card from shoe and add it to an active hand", () => {
      state.hands = [clone(BASE_HAND), clone(BASE_HAND), clone(BASE_HAND)];
      state.hands[1].cards = [{}];
      state.shoe = [{}, {}, {}, {}];
      DEAL_CARD(state, 1);
      expect(state.shoe.length).toEqual(3);
      expect(state.hands[1].cards.length).toEqual(2);
    });
  });
  describe("Given that `BET` mutation is commited", () => {
    const { BET } = mutations;
    it("should not allow to bet if bank for the player is empty", () => {
      state.hands = [clone(BASE_HAND), clone(BASE_HAND), clone(BASE_HAND)];
      state.bank = [10, 0, 42];
      BET(state);
      expect(state.bank).toEqual([9, 0, 41]);
      expect(state.hands[0].bet).toEqual(1);
      expect(state.hands[1].bet).toEqual(null);
      expect(state.hands[2].bet).toEqual(1);
    });
  });
  describe("Given that `STAND` mutation is commited", () => {
    const { STAND } = mutations;
    beforeEach(() => {
      state.hands = [clone(BASE_HAND), clone(BASE_HAND), clone(BASE_HAND)];
    });
    it("should increase activeHandIndex by 1 if there is next player", () => {
      state.activeHandIndex = 1;
      STAND(state, 1);
      expect(state.activeHandIndex).toEqual(2);
    });
    it("should change activeHandIndex to 0 if there is no next player", () => {
      state.activeHandIndex = 2;
      STAND(state, 2);
      expect(state.activeHandIndex).toEqual(0);
    });
  });
  describe("Given that `SET_IS_DEALING` mutation is commited", () => {
    const { SET_IS_DEALING } = mutations;
    it("should set state.isDealing", () => {
      SET_IS_DEALING(state, { isDealing: true });
      expect(state.isDealing).toEqual(true);
    });
  });
  describe("Given that `SET_RESULTS` mutation is commited", () => {
    const { SET_RESULTS } = mutations;
    beforeEach(() => {
      state.hands = [clone(BASE_HAND), clone(BASE_HAND), clone(BASE_HAND)];
    });
    it("should update result for the hand", () => {
      state.isDealing = true;
      SET_RESULTS(state, {
        result: {
          result: blackjack.RESULTS.BLACKJACK.result,
          score: blackjack.RESULTS.BLACKJACK.score
        },
        handIndex: 1
      });
      expect(state.hands[1].result).toEqual(blackjack.RESULTS.BLACKJACK.result);
      expect(state.hands[1].score).toEqual(blackjack.RESULTS.BLACKJACK.score);
    });
    it("should update bank for the hand", () => {
      state.hands[1].bet = 2;
      state.bank[1] = 5;
      SET_RESULTS(state, { result: { result: "", score: 2 }, handIndex: 1 });
      expect(state.bank[1]).toEqual(9);
    });
    it("should set state.isDealing false", () => {
      state.isDealing = true;
      SET_RESULTS(state, { result: { result: "", score: 0 }, handIndex: 1 });
      expect(state.isDealing).toEqual(false);
    });
  });
  describe("Given that `ROUND_OVER` mutation is commited", () => {
    const { ROUND_OVER } = mutations;
    it("should set state.isRoundOver to true", () => {
      ROUND_OVER(state);
      expect(state.isRoundOver).toEqual(true);
    });
  });
  describe("Given that `RESET_ROUND` mutation is commited", () => {
    const { RESET_ROUND } = mutations;
    it("should set state.isRoundOver to false", () => {
      RESET_ROUND(state);
      expect(state.isRoundOver).toEqual(false);
    });
    it("should set state.activeHandIndex to null", () => {
      RESET_ROUND(state);
      expect(state.activeHandIndex).toEqual(null);
    });
  });
});
