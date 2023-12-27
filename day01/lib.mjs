import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Problems trying to use __dirname in a .mjs file
// https://byby.dev/node-dirname-not-defined
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const readLinesFromFile = async (filename) => {
  const path = resolve(__dirname, filename);
  const text = await fs.readFile(path, "utf-8");
  return text.split(/\s/).filter(Boolean);
};

const isDigit = (ch) => /\d/.test(ch)

const mapping = new Map([
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
]);

const FORWARDS_SENTINEL = Number.MAX_SAFE_INTEGER;
const BACKWARDS_SENTINEL = Number.MIN_SAFE_INTEGER;

const DIRECTION = Object.freeze({
  FORWARDS: "FORWARDS",
  BACKWARDS: "BACKWARDS",
});

const findNumberAsWord = (line, direction) => {
  const isForwards = direction === DIRECTION.FORWARDS;

  const kvps = Array.from(mapping.entries());

  const lookups = kvps.map(([word, digit]) => {
    const index = isForwards ? line.indexOf(word) : line.lastIndexOf(word);
    return { index, digit }
  });

  const positiveLookups = lookups.filter(({ index }) => index >= 0);

  const sortedLookups = positiveLookups.sort((a, b) =>
    isForwards
      ? a.index - b.index
      : b.index - a.index
  );

  if (sortedLookups.length > 0) {
    return sortedLookups[0];
  }

  return { index: isForwards ? FORWARDS_SENTINEL : BACKWARDS_SENTINEL };
};

const findNumberAsDigit = (line, direction) => {
  const isForwards = direction === DIRECTION.FORWARDS;
  const chars = Array.from(line);
  const index = isForwards ? chars.findIndex(isDigit) : chars.findLastIndex(isDigit);
  if (index >= 0) {
    const digit = chars[index];
    return { index, digit };
  }
  return { index: isForwards ? FORWARDS_SENTINEL : BACKWARDS_SENTINEL };
};

const findFirstNumber = (line) => {
  const wordResult = findNumberAsWord(line, DIRECTION.FORWARDS);
  const digitResult = findNumberAsDigit(line, DIRECTION.FORWARDS);
  return wordResult.index < digitResult.index ? wordResult.digit : digitResult.digit;
};

const findSecondNumber = (line) => {
  const wordResult = findNumberAsWord(line, DIRECTION.BACKWARDS);
  const digitResult = findNumberAsDigit(line, DIRECTION.BACKWARDS);
  return wordResult.index > digitResult.index ? wordResult.digit : digitResult.digit;
};

export const lineToNumber = (line) => {
  const numberString = findFirstNumber(line) + findSecondNumber(line);
  return Number(numberString)
};

export const linesToNumbers = (lines) => {
  return lines.map(lineToNumber);
};

const sumNumbers = (ns) => ns.reduce((acc, n) => acc + n, 0);

export const solveIt = async (filename) => {
  const lines = await readLinesFromFile(filename);
  const numbers = linesToNumbers(lines);
  return sumNumbers(numbers);
};
