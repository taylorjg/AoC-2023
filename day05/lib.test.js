import { parseFile, solveItPart1 } from "./lib.mjs";

describe("lib tests", () => {
  it("parseFile", async () => {
    const actual = await parseFile("test-input.txt");
    expect(actual.seeds).toEqual([79, 14, 55, 13]);
    expect(actual.seedToSoilMap).toEqual([
      { sourceStart: 98, destinationStart: 50, length: 2 },
      { sourceStart: 50, destinationStart: 52, length: 48 },
    ]);
    expect(actual.soilToFertilizerMap).toEqual([
      { sourceStart: 15, destinationStart: 0, length: 37 },
      { sourceStart: 52, destinationStart: 37, length: 2 },
      { sourceStart: 0, destinationStart: 39, length: 15 },
    ]);
    expect(actual.fertilizerToWaterMap).toEqual([
      { sourceStart: 53, destinationStart: 49, length: 8 },
      { sourceStart: 11, destinationStart: 0, length: 42 },
      { sourceStart: 0, destinationStart: 42, length: 7 },
      { sourceStart: 7, destinationStart: 57, length: 4 },
    ]);
    expect(actual.waterToLightMap).toEqual([
      { sourceStart: 18, destinationStart: 88, length: 7 },
      { sourceStart: 25, destinationStart: 18, length: 70 },
    ]);
    expect(actual.lightToTemperatureMap).toEqual([
      { sourceStart: 77, destinationStart: 45, length: 23 },
      { sourceStart: 45, destinationStart: 81, length: 19 },
      { sourceStart: 64, destinationStart: 68, length: 13 },
    ]);
    expect(actual.temperatureToHumidityMap).toEqual([
      { sourceStart: 69, destinationStart: 0, length: 1 },
      { sourceStart: 0, destinationStart: 1, length: 69 },
    ]);
    expect(actual.humidityToLocationMap).toEqual([
      { sourceStart: 56, destinationStart: 60, length: 37 },
      { sourceStart: 93, destinationStart: 56, length: 4 },
    ]);
  });

  it("solveItPart1", async () => {
    const actual = await solveItPart1("test-input.txt");
    expect(actual).toBe(35);
  });
});
