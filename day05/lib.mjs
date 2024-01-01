import { readLinesFromFile } from "../utils.mjs";

const readSeeds = (lines) => {
  const m = lines[0].matchAll(/(\d+)/g);
  return Array.from(m).map(([numberString]) => Number(numberString));
};

const readMap = (lines, mapName) => {
  let index = lines.indexOf(`${mapName} map:`);
  const result = [];
  for (; ;) {
    const nextLine = lines[++index];
    if (nextLine === undefined || !/\d/.test(nextLine[0])) break;
    const m = nextLine.matchAll(/(\d+)/g);
    const [destinationStart, sourceStart, length] = Array.from(m).map(([numberString]) => Number(numberString));
    result.push({ destinationStart, sourceStart, length });
  }
  return result;
};

export const parseFile = async (filename) => {
  const lines = await readLinesFromFile("day05", filename);
  return {
    seeds: readSeeds(lines),
    seedToSoilMap: readMap(lines, "seed-to-soil"),
    soilToFertilizerMap: readMap(lines, "soil-to-fertilizer"),
    fertilizerToWaterMap: readMap(lines, "fertilizer-to-water"),
    waterToLightMap: readMap(lines, "water-to-light"),
    lightToTemperatureMap: readMap(lines, "light-to-temperature"),
    temperatureToHumidityMap: readMap(lines, "temperature-to-humidity"),
    humidityToLocationMap: readMap(lines, "humidity-to-location"),
  };
};

const lookupInMap = (map, value) => {
  for (const entry of map) {
    const { sourceStart, destinationStart, length } = entry;
    if (value >= sourceStart && value < sourceStart + length) {
      const delta = value - sourceStart;
      return destinationStart + delta;
    }
  }
  return value;
};

const processSeed = (details) => (seed) => {
  const soil = lookupInMap(details.seedToSoilMap, seed);
  const fertilizer = lookupInMap(details.soilToFertilizerMap, soil);
  const water = lookupInMap(details.fertilizerToWaterMap, fertilizer);
  const light = lookupInMap(details.waterToLightMap, water);
  const temperature = lookupInMap(details.lightToTemperatureMap, light);
  const humidity = lookupInMap(details.temperatureToHumidityMap, temperature);
  const location = lookupInMap(details.humidityToLocationMap, humidity);
  return location;
};

export const solveItPart1 = async (filename) => {
  const details = await parseFile(filename);
  const locations = details.seeds.map(processSeed(details));
  return Math.min(...locations);
};

export const solveItPart2 = async (filename) => {
  const details = await parseFile(filename);
  const locations = details.seeds.map(processSeed(details));
  return Math.min(...locations);
};
