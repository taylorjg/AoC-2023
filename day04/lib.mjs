import { readLinesFromFile, range, sum } from "../utils.mjs";

const parseLine = (line) => {
  const [part1, part2] = line.split(":").map((s) => s.trim());
  const [, cardNumberString] = part1.split(/\s+/);
  const cardNumber = Number(cardNumberString);
  const [winningNumbersString, numbersWeHaveString] = part2.split("|").map((s) => s.trim());
  const winningNumbers = winningNumbersString.split(/\s+/).map(Number);
  const numbersWeHave = numbersWeHaveString.split(/\s+/).map(Number);
  return { cardNumber, winningNumbers, numbersWeHave };
};

export const parseFile = async (filename) => {
  const lines = await readLinesFromFile("day04", filename);
  return lines.map(parseLine);
};

const calculateCardValue = (card) => {
  const count = card.numbersWeHave.reduce((acc, number) =>
    card.winningNumbers.includes(number) ? acc + 1 : acc, 0);
  if (count === 0) return 0;
  return Math.pow(2, count - 1);
};

const addCardValues = (cards) => {
  cards.forEach((card) => {
    const cardValue = calculateCardValue(card);
    card.cardValue = cardValue;
  });
};

export const solveItPart1 = async (filename) => {
  const cards = await parseFile(filename);
  addCardValues(cards);
  const cardValues = cards.map(({ cardValue }) => cardValue);
  return sum(cardValues);
};

const calculateCardValue2 = (card) =>
  card.numbersWeHave.reduce((acc, number) =>
    card.winningNumbers.includes(number) ? acc + 1 : acc, 0);

const addCardValues2 = (cards) => {
  cards.forEach((card) => {
    const cardValue = calculateCardValue2(card);
    card.cardValue = cardValue;
  });
};

const findCard = (cards, cardNumber) =>
  cards.find((card) => card.cardNumber === cardNumber);

const makeClonedCards = (map, cards, card) => {
  const clonedCards = [];
  for (const n of range(card.cardValue)) {
    const cardNumberToClone = card.cardNumber + n + 1;
    const cardToClone = findCard(cards, cardNumberToClone);
    const oldCount = map.get(cardToClone.cardNumber);
    const newCount = oldCount + 1;
    map.set(cardToClone.cardNumber, newCount);
    const clonedCard = { ...cardToClone };
    clonedCards.push(clonedCard);
  }
  return clonedCards;
};

const processCard = (map, cards, card) => {
  const clonedCards = makeClonedCards(map, cards, card);
  for (const clonedCard of clonedCards) {
    processCard(map, cards, clonedCard);
  }
};

const processCards = (map, cards) => {
  for (const card of cards) {
    processCard(map, cards, card);
  }
};

export const solveItPart2 = async (filename) => {
  const cards = await parseFile(filename);
  addCardValues2(cards);
  const map = new Map(cards.map((card) => [card.cardNumber, 1]));
  processCards(map, cards);
  const cardCounts = Array.from(map.values());
  return sum(cardCounts);
};
