import { parseFile, parseFile2, solveItPart1, solveItPart2 } from "./lib.mjs";

describe("lib tests", () => {
  it("parseFile", async () => {
    const actual = await parseFile("test-input.txt");
    expect(actual).toEqual([
      { time: 7, distance: 9 },
      { time: 15, distance: 40 },
      { time: 30, distance: 200 },
    ]);
  });

  it("parseFile2", async () => {
    const actual = await parseFile2("test-input.txt");
    expect(actual).toEqual({ time: 71530, distance: 940200 });
  });

  it("solveItPart1", async () => {
    const actual = await solveItPart1("test-input.txt");
    expect(actual).toBe(288);
  });

  it("solveItPart2", async () => {
    const actual = await solveItPart2("test-input.txt");
    expect(actual).toBe(71503);
  });
});
