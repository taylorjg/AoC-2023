import { readLinesFromFile, range, sum } from "../utils.mjs";

const findNumbersWithCoordsInLine = (line, index) => {
  const y = index;
  const numbersWithCoords = [];
  const matches = line.matchAll(/(\d+)/g);
  for (const match of matches) {
    const [numberString] = match;
    const x = match.index;
    numbersWithCoords.push({
      number: Number(numberString),
      x,
      y,
      length: numberString.length,
    });
  }
  return numbersWithCoords;
};

const findNumbersWithCoords = (lines) => {
  const numbersWithCoords = lines.flatMap(findNumbersWithCoordsInLine);
  return numbersWithCoords;
};

const getNeighbours = (width, height, x, y) => {
  const deltas = [
    [-1, -1],
    [-1, 0],
    [-1, 1],

    [0, -1],
    [0, 1],

    [1, -1],
    [1, 0],
    [1, 1],
  ];

  return deltas
    .map(([dx, dy]) => ({ x: x + dx, y: y + dy }))
    .filter(({ x, y }) => x >= 0 && y >= 0 && x < width && y < height);
};

const isNumberAdjacentToSymbol = (lines) => (numberWithCoords) => {
  const height = lines.length;
  const width = lines[0].length;
  const allNeighbours = range(numberWithCoords.length).flatMap((n) => {
    const x = numberWithCoords.x + n;
    const y = numberWithCoords.y;
    return getNeighbours(width, height, x, y);
  });
  return allNeighbours.some(({ x, y }) => {
    const ch = lines[y][x];
    return /[^\d.]/.test(ch);
  });
};

const findPartNumbers = (lines) => {
  const numbersWithCoords = findNumbersWithCoords(lines);
  return numbersWithCoords.filter(isNumberAdjacentToSymbol(lines)).map(({ number }) => number);
};

export const solveItPart1 = async (filename) => {
  const lines = await readLinesFromFile("day03", filename);
  const partNumbers = findPartNumbers(lines);
  return sum(partNumbers);
};

const findAsterisks = (lines) => {
  const height = lines.length;
  const width = lines[0].length;
  const asterisks = [];
  for (const y of range(height)) {
    for (const x of range(width)) {
      const ch = lines[y][x];
      if (ch === "*") {
        asterisks.push({ x, y });
      }
    }
  }
  return asterisks;
};

const findAdjacentNumbers = (lines, asterisk, numbersWithCoords) => {
  const height = lines.length;
  const width = lines[0].length;
  return numbersWithCoords.filter((numberWithCoords) => {
    const allNeighbours = range(numberWithCoords.length).flatMap((n) => {
      const x = numberWithCoords.x + n;
      const y = numberWithCoords.y;
      return getNeighbours(width, height, x, y);
    });
    return allNeighbours.some(({ x, y }) => x === asterisk.x && y === asterisk.y);
  });
};

const findGears = (lines) => {
  const numbersWithCoords = findNumbersWithCoords(lines);
  const asterisks = findAsterisks(lines);
  const gears = [];
  for (const asterisk of asterisks) {
    const adjacentNumbers = findAdjacentNumbers(lines, asterisk, numbersWithCoords);
    if (adjacentNumbers.length === 2) {
      gears.push({
        number1: adjacentNumbers[0].number,
        number2: adjacentNumbers[1].number
      });
    }
  }
  return gears;
};

const calculateGearRatio = (gear) => {
  const { number1, number2 } = gear;
  return number1 * number2;
};

export const solveItPart2 = async (filename) => {
  const lines = await readLinesFromFile("day03", filename);
  const gears = findGears(lines);
  return sum(gears.map(calculateGearRatio));
};
