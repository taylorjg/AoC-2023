import { readLinesFromFile, sum, reverseString } from "../utils.mjs";

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

const isDigit = (ch) => /\d/.test(ch)

const matchStringToDigit = (s) => isDigit(s) ? s : mapping.get(s);

const words = Array.from(mapping.keys());
const reversedWords = words.map(reverseString);
const regexNormalWords = new RegExp(`(${[...words, "[1-9]"].join("|")})`, "g");
const regexReversedWords = new RegExp(`(${[...reversedWords, "[1-9]"].join("|")})`, "g");

export const lineToNumber = (line) => {
  const reversedLine = reverseString(line);
  const matches = Array.from(line.matchAll(regexNormalWords));
  const reverseMatches = Array.from(reversedLine.matchAll(regexReversedWords));
  const firstMatchString = matches[0][0];
  const lastMatchString = reverseString(reverseMatches[0][0]);
  const firstDigit = matchStringToDigit(firstMatchString);
  const lastDigit = matchStringToDigit(lastMatchString);
  return Number(`${firstDigit}${lastDigit}`);
};

export const linesToNumbers = (lines) => {
  return lines.map(lineToNumber);
};

export const solveIt = async (filename) => {
  const lines = await readLinesFromFile("day01", filename);
  const numbers = linesToNumbers(lines);
  return sum(numbers);
};
