// GOAL: get as close as possible to total 21
// CARD VALUES/SCORING - ace: 1 or 11, face cards: 10, other: pip values
// BETTING - Before the deal begins, each player places a bet (the general limits are from $2 to $500)
// NATURAL - If a player's first two cards are an ace and a "ten-card" (a picture card or 10), giving a count of 21 in two cards, this is a natural or "blackjack."
// THE DEAL - dealer(face up), player(face up), dealer(face down), player(face up)

// THE PLAY - The player must decide whether to "stand" (not ask for another card) or "hit" (ask for another card)

// THE DEALER'S PLAY - the dealers face-down card is turned up
// If the total is 17 or more, it must stand.
// If the total is 16 or under, they must take a card.
// If the dealer has an ace, and counting it as 11 would bring the total to 17 or more (but not over 21), the dealer must count the ace as 11 and stand.

// BUST - if a total is ove than 21

const RESULTS = {
  BUST: 1,
  WIN: 2,
  LOSE: 3,
  PUSH: 4,
  BLACKJACK: 5
};

const FACE_VALUES = { a: 1, J: 10, Q: 10, K: 10, A: 11 };

// eslint-disable-next-line prettier/prettier
const CARD_VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
const SUITES = ["spade", "heart", "diamond", "club"];

const shuffleCards = deckToShuffle => {
  // we'll create a clone to avoid modifying the actual deck
  let clone = deckToShuffle.slice();
  for (let i = clone.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[rand]] = [clone[rand], clone[i]];
  }
  return clone;
};

/**
 * create a deck of cards using (value, suit) pair
 * @returns a list of cards in [{value: "2", suit: "C"}] format
 */
const createDeck = () => {
  let deck = [];
  CARD_VALUES.forEach(value => {
    SUITES.forEach(suit => {
      deck.push({ value, suit });
    });
  });
  return deck;
};

/**
 * create a shoe of shuffled cards
 * @param {*} nbDecks number of decks
 */
export function createShoe(nbDecks = 1) {
  let shoe = [];
  for (let i = 0; i < nbDecks; i++) {
    shoe = shoe.concat(createDeck());
  }
  return shuffleCards(shoe);
};

const getCardValue = card => {
  return FACE_VALUES[card.value] ? FACE_VALUES[card.value] : card.value;
};

const sumOfCards = (acc, card) => acc + getCardValue(card);

/**
 * the combination of an ace with a card other than a ten-card is known as a "soft hand"
 * @param {*} hand players' cards
 * @returns true if is a soft hand false otherwise
 */
const isSoftHand = hand => {
  const doesHandContainAce = hand.some(card => card.value === "A");
  const doesHandContainAnotherTenCard = getScore(true, hand) === 21;
  return doesHandContainAce && doesHandContainAnotherTenCard ? true : false;
};

/**
 * change value of all aces to 1
 * @param {*} hand players' cards
 * @returns an array of cards
 */
const allAcesToOne = hand => {
  let clone = hand.slice();
  return clone.map(card => {
    card.value = card.value === "A" ? "a" : card.value;
  });
};

/**
 * change value of first ace in the hand to 11
 * @param {*} hand players' cards
 * @returns an array of cards
 */
const firstAceToEleven = hand => {
  let clone = hand.slice();
  let firstAce = clone.find(card => card.value === "a");
  firstAce.value = "A";
  return clone;
};

/**
 * get total score of players' cards
 * @param {*} isAceBigger should value of the Ace be 11
 * @param {*} hand players' cards
 * @returns score value
 */
const getScore = (isAceBigger = false, hand) => {
  let lowCards = allAcesToOne(hand);
  let minimum = lowCards.reduce(sumOfCards, 0);
  let highCards = firstAceToEleven(lowCards);
  let maximum = highCards.reduce(sumOfCards, 0);
  return maximum <= 21 || isAceBigger ? maximum : minimum;
};
