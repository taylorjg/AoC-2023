import { readLinesFromFile, sum } from "../utils.mjs";

const parseLine = (line) => {
  const [gameString, setsString] = line.split(":");
  const m = gameString.match(/Game (\d+)/);
  const id = Number(m[1]);
  const setStrings = setsString.split(";");

  const sets = [];

  for (const setString of setStrings) {
    const countAndColourStrings = setString.split(",").map((s) => s.trim());
    const seed = { red: 0, green: 0, blue: 0 };
    const set = countAndColourStrings.reduce((acc, countAndColourString) => {
      const [countString, colour] = countAndColourString.split(" ");
      const count = Number(countString);
      return { ...acc, [colour]: acc[colour] + count };
    }, seed);
    sets.push(set);
  }

  return { id, sets };
};

export const parseFile = async (filename) => {
  const lines = await readLinesFromFile("day02", filename);
  return lines.map(parseLine);
};

export const solveItPart1 = async (filename) => {
  const games = await parseFile(filename);
  const maximums = { red: 12, green: 13, blue: 14 };

  const isPossibleSet = (set) => {
    return (
      set.red <= maximums.red &&
      set.green <= maximums.green &&
      set.blue <= maximums.blue
    );
  };

  const isPossibleGame = (game) => {
    return game.sets.every(isPossibleSet);
  };

  const possibleGames = games.filter(isPossibleGame);
  const ids = possibleGames.map(({ id }) => id);
  return sum(ids);
};

export const solveItPart2 = async (filename) => {
  const games = await parseFile(filename);
  const calculateMinimumsForGame = (game) => {
    const reds = game.sets.map(({ red }) => red);
    const greens = game.sets.map(({ green }) => green);
    const blues = game.sets.map(({ blue }) => blue);
    return {
      red: Math.max(...reds),
      green: Math.max(...greens),
      blue: Math.max(...blues)
    };
  };
  const minimumsForAllGames = games.map(calculateMinimumsForGame);
  const calculatePowerOfMinimums = ({ red, green, blue }) => red * green * blue;
  return sum(minimumsForAllGames.map(calculatePowerOfMinimums));
};
