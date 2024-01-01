import { parseFile, solveItPart1, solveItPart2 } from "./lib.mjs";

describe("lib tests", () => {
  it("parseFile", async () => {
    const actual = await parseFile("test-input.txt");
    expect(actual).toEqual([
      { cardNumber: 1, winningNumbers: [41, 48, 83, 86, 17], numbersWeHave: [83, 86, 6, 31, 17, 9, 48, 53] },
      { cardNumber: 2, winningNumbers: [13, 32, 20, 16, 61], numbersWeHave: [61, 30, 68, 82, 17, 32, 24, 19] },
      { cardNumber: 3, winningNumbers: [1, 21, 53, 59, 44], numbersWeHave: [69, 82, 63, 72, 16, 21, 14, 1] },
      { cardNumber: 4, winningNumbers: [41, 92, 73, 84, 69], numbersWeHave: [59, 84, 76, 51, 58, 5, 54, 83] },
      { cardNumber: 5, winningNumbers: [87, 83, 26, 28, 32], numbersWeHave: [88, 30, 70, 12, 93, 22, 82, 36] },
      { cardNumber: 6, winningNumbers: [31, 18, 13, 56, 72], numbersWeHave: [74, 77, 10, 23, 35, 67, 36, 11] },
    ]);
  });

  it("solveItPart1", async () => {
    const actual = await solveItPart1("test-input.txt");
    expect(actual).toBe(13);
  });

  it("solveItPart2", async () => {
    const actual = await solveItPart2("test-input.txt");
    expect(actual).toBe(30);
  });
});
