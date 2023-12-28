import { readLinesFromFile, sum, first, last } from "../utils.mjs";

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

export const lineToNumber = (line) => {
  const matches = Array.from(line.matchAll(/(one|two|three|four|five|six|seven|eight|nine|\d)/g));
  const [firstMatchString] = first(matches);
  const [lastMatchString] = last(matches);
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
