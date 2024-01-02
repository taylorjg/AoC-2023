import { readLinesFromFile, sum, range } from "../utils.mjs";

const parseLine = (line) => {
  const [hand, bidString] = line.split(" ");
  const bid = Number(bidString);
  return { hand, bid };
};

export const parseFile = async (filename) => {
  const lines = await readLinesFromFile("day07", filename);
  return lines.map(parseLine);
};

const groupCards = (hand) => {
  const chars = Array.from(hand);
  const map = new Map();
  for (const ch of chars) {
    const oldCount = map.get(ch) ?? 0;
    const newCount = oldCount + 1;
    map.set(ch, newCount);
  }
  return map;
};

const isFiveOfAKind = (map) => {
  return Array.from(map.values()).includes(5);
};

const isFourOfAKind = (map) => {
  return Array.from(map.values()).includes(4);
};

const isFullHouse = (map) => {
  const values = Array.from(map.values());
  return values.includes(3) && values.includes(2);
};

const isThreeOfAKind = (map) => {
  return Array.from(map.values()).includes(3);
};

const isTwoPairs = (map) => {
  const values = Array.from(map.values());
  const twos = values.filter((value) => value === 2);
  return twos.length === 2;
};

const isOnePair = (map) => {
  return Array.from(map.values()).includes(2);
};

const findHandType = (hand) => {
  const map = groupCards(hand);
  if (isFiveOfAKind(map)) return 7;
  if (isFourOfAKind(map)) return 6;
  if (isFullHouse(map)) return 5;
  if (isThreeOfAKind(map)) return 4;
  if (isTwoPairs(map)) return 3;
  if (isOnePair(map)) return 2;
  return 1;
};

const cardOrder = "AKQJT98765432";

const compareStrongestCard = (hand1, hand2, index) => {
  const card1 = hand1[index];
  const card2 = hand2[index];
  const strength1 = cardOrder.indexOf(card1);
  const strength2 = cardOrder.indexOf(card2);
  return strength2 - strength1;
};

const compareStrongestCards = (hand1, hand2) => {
  for (const index of range(5)) {
    const result = compareStrongestCard(hand1, hand2, index);
    if (result !== 0) return result;
  }
  return 0;
};

const compareHandsAndBids = (a, b) => {
  const hand1 = a.hand;
  const hand2 = b.hand;
  const hand1Type = findHandType(hand1);
  const hand2Type = findHandType(hand2);
  if (hand1Type !== hand2Type) return hand1Type - hand2Type;
  return compareStrongestCards(hand1, hand2);
};

const sortHandsAndBids = (handsAndBids) => {
  return [...handsAndBids].sort(compareHandsAndBids);
};

export const solveItPart1 = async (filename) => {
  const handsAndBids = await parseFile(filename);
  const handsAndBidsSorted = sortHandsAndBids(handsAndBids);
  const winnings = handsAndBidsSorted.map(({ bid }, index) => {
    const rank = index + 1;
    return rank * bid;
  });
  return sum(winnings);
};

export const solveItPart2 = async (filename) => {
  const handsAndBids = await parseFile(filename);
  const handsAndBidsSorted = sortHandsAndBids(handsAndBids);
  const winnings = handsAndBidsSorted.map(({ bid }, index) => {
    const rank = index + 1;
    return rank * bid;
  });
  return sum(winnings);
};
