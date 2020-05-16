// GOAL: get as close as possible to total 21
// CARD VALUES/SCORING - ace: 1 or 11, face cards: 10, other: pip values
// BETTING - Before the deal begins, each player places a bet (the general limits are from $2 to $500)
// NATURAL - If a player's first two cards are an ace and a "ten-card" (a picture card or 10), giving a count of 21 in two cards, this is a natural or "blackjack."
// THE DEAL - dealer(face up), player(face up), dealer(face down), player(face up)

// THE PLAY - The player must decide whether to "stand" (not ask for another card) or "hit" (ask for another card)
// SOFT HAND - the combination of an ace with a card other than a ten-card (if count is not 21 with an ace)
// because the player can count the ace as a 1 or 11, and either draw cards or not.
// For example with a "soft 17" (an ace and a 6), the total is 7 or 17.
// While a count of 17 is a good hand, the player may wish to draw for a higher total.
// If the draw creates a BUST hand by counting the ace as an 11,
// the player simply counts the ace as a 1 and continues playing by standing or "hitting"

// THE DEALER'S PLAY - the dealers face-down card is turned up
// If the total is 17 or more, it must stand.
// If the total is 16 or under, they must take a card.
// If the dealer has an ace, and counting it as 11 would bring the total to 17 or more (but not over 21), the dealer must count the ace as 11 and stand.

// BUST - if a total is ove than 21

const FACE_VALUES = {
  a: 1,
  J: 10,
  Q: 10,
  K: 10,
  A: 11
};

const RESULTS = {
  BUST: 1,
  WIN: 2,
  LOSE: 3,
  PUSH: 4,
  BLACKJACK: 5
};
// eslint-disable-next-line prettier/prettier
const CARD_VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
const SUITES = ["C", "D", "H", "S"];

const shuffleCards = deckToShuffle => {
  // we don't want to modify the actual deck so we'll create a clone
  const clone = deckToShuffle.slice();
  for (let i = clone.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[rand]] = [clone[rand], clone[i]];
  }
  return clone;
};

const createDeck = () => {
  let deck = [];
  CARD_VALUES.forEach(value => {
    SUITES.forEach(suit => {
      deck.push({ value, suit });
    });
  });
  return deck;
};

const createShoe = (nbDecks = 1) => {
  let shoe = [];
  for (let i = 0; i < nbDecks; i++) {
    shoe = shoe.concat(createDeck);
  }
  return shuffleCards(shoe);
};

const getCardValue = card => {
  return FACE_VALUES[card.value] ? FACE_VALUES[card.value] : card.value;
};

// const toggleAceValue = card => {
//   return card.value == "A" ? "a" : "A";
// };

// const isSoftHand = card => {

// };