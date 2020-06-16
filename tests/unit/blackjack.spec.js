import blackjack from "../../src/library/blackjack";

describe.only("blackjack", () => {
  beforeEach(() => {});
  describe("Given that checkResult is called", () => {
    const cards = [
      { value1: [2, 15], value2: [6, 19], result: blackjack.RESULTS.BUST },
      { value1: [2, 15], value2: [8, 9], result: blackjack.RESULTS.STANDOFF },
      { value1: [10, 10], value2: [10, 9], result: blackjack.RESULTS.LOSE },
      { value1: [6, 2], value2: [10, 11], result: blackjack.RESULTS.BLACKJACK },
      { value1: [10, 2], value2: [10, 8, 3], result: blackjack.RESULTS.WIN },
      { value1: [8, 9, 9], value2: [10, 3], result: blackjack.RESULTS.WIN }, // dealer bust
      { value1: [10, 11], value2: [10, 5, 6], result: blackjack.RESULTS.STANDOFF }, // stand off 21
      { value1: [10, 11], value2: [10, 5], result: blackjack.RESULTS.LOSE }, // dealer blackjack
      { value1: [10, 9], value2: [10, 10], result: blackjack.RESULTS.WIN }
    ];
    cards.forEach(card => {
      it(`should return + ${card.result}`, () => {
        let hand1 = [];
        let hand2 = [];
        for (let i = 0; i < card.value1.length; i++) {
          hand1.push({ value: card.value1[i], suit: "club" });
        }
        for (let i = 0; i < card.value2.length; i++) {
          hand2.push({ value: card.value2[i], suit: "club" });
        }
        const res = blackjack.checkResult(hand1, hand2);
        expect(res).toEqual(card.result);
      });
    });
  });
});
