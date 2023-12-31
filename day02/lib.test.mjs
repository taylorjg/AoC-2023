import { parseFile, solveItPart1, solveItPart2 } from "./lib.mjs";

describe("lib tests", () => {
  it("parseFile", async () => {
    const actual = await parseFile("test-input.txt");
    expect(actual).toEqual([
      {
        id: 1,
        sets: [
          { red: 4, green: 0, blue: 3 },
          { red: 1, green: 2, blue: 6 },
          { red: 0, green: 2, blue: 0 },
        ],
      },
      {
        id: 2,
        sets: [
          { red: 0, green: 2, blue: 1 },
          { red: 1, green: 3, blue: 4 },
          { red: 0, green: 1, blue: 1 },
        ],
      },
      {
        id: 3,
        sets: [
          { red: 20, green: 8, blue: 6 },
          { red: 4, green: 13, blue: 5 },
          { red: 1, green: 5, blue: 0 },
        ],
      },
      {
        id: 4,
        sets: [
          { red: 3, green: 1, blue: 6 },
          { red: 6, green: 3, blue: 0 },
          { red: 14, green: 3, blue: 15 },
        ],
      },
      {
        id: 5,
        sets: [
          { red: 6, green: 3, blue: 1 },
          { red: 1, green: 2, blue: 2 },
        ],
      }
    ]);
  });

  it("solveItPart1", async () => {
    const actual = await solveItPart1("test-input.txt");
    expect(actual).toBe(8);
  });

  it("solveItPart2", async () => {
    const actual = await solveItPart2("test-input.txt");
    expect(actual).toBe(2286);
  });
});
