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

const matchToNumber = (match) => isDigit(match) ? match : mapping.get(match);

export const lineToNumber = (line) => {
  const matches = Array.from(line.matchAll(/(one|two|three|four|five|six|seven|eight|nine|\d)/g));
  const firstMatch = matches[0][0];
  const lastMatch = matches[matches.length - 1][0];
  const firstNumber = matchToNumber(firstMatch);
  const secondNumber = matchToNumber(lastMatch);
  return Number(firstNumber + secondNumber);
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
