import { readLinesFromFile, range, product } from "../utils.mjs";

const parseNumbers = (s) => {
  const m = s.matchAll(/(\d+)/g);
  return Array.from(m).map(([numberString]) => Number(numberString));
};

export const parseFile = async (filename) => {
  const lines = await readLinesFromFile("day06", filename);
  const times = parseNumbers(lines[0]);
  const distances = parseNumbers(lines[1]);
  return range(times.length).map((index) => {
    const time = times[index];
    const distance = distances[index];
    return { time, distance };
  });
};

const parseNumbers2 = (s) => {
  const m = s.replace(/\s+/g, "").match(/(\d+)/g);
  return Number(m[0]);
};

export const parseFile2 = async (filename) => {
  const lines = await readLinesFromFile("day06", filename);
  const time = parseNumbers2(lines[0]);
  const distance = parseNumbers2(lines[1]);
  return { time, distance };
};

const findNumWaysToWin = (race) => {
  const waysToWin = [];
  for (const n of range(race.time)) {
    const timeLeft = race.time - n;
    const speed = n;
    const distanceTravelled = timeLeft * speed;
    if (distanceTravelled > race.distance) {
      waysToWin.push(n);
    }
  }
  return waysToWin;
};

export const solveItPart1 = async (filename) => {
  const races = await parseFile(filename);
  const numWaysToWinPerRace = races.map(findNumWaysToWin);
  const counts = numWaysToWinPerRace.map((ways) => ways.length);
  return product(counts);
};

export const solveItPart2 = async (filename) => {
  const race = await parseFile2(filename);
  const waysToWin = findNumWaysToWin(race);
  return waysToWin.length;
};
