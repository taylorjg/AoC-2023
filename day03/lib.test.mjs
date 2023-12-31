import { solveItPart1, solveItPart2 } from "./lib.mjs";

describe("lib tests", () => {
  it("solveItPart1", async () => {
    const actual = await solveItPart1("test-input.txt");
    expect(actual).toBe(4361);
  });

  it("solveItPart2", async () => {
    const actual = await solveItPart2("test-input.txt");
    expect(actual).toBe(467835);
  });
});
