import { parseFile, solveItPart1, solveItPart2 } from "./lib.mjs";

describe("lib tests", () => {
  it("parseFile", async () => {
    const actual = await parseFile("test-input.txt");
    expect(actual).toEqual([
      { hand: "32T3K", bid: 765 },
      { hand: "T55J5", bid: 684 },
      { hand: "KK677", bid: 28 },
      { hand: "KTJJT", bid: 220 },
      { hand: "QQQJA", bid: 483 },
    ]);
  });

  it("solveItPart1", async () => {
    const actual = await solveItPart1("test-input.txt");
    expect(actual).toBe(6440);
  });

  it("solveItPart2", async () => {
    const actual = await solveItPart2("test-input.txt");
    expect(actual).toBe(5905);
  });
});
