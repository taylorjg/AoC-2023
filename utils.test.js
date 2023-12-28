import { readLinesFromFile, sum, first, last } from "./utils.mjs";

describe("utils tests", () => {
  it("readLinesFromFile", async () => {
    const actual = await readLinesFromFile("day01", "test-input-part-1.txt");
    expect(actual).toEqual([
      "1abc2",
      "pqr3stu8vwx",
      "a1b2c3d4e5f",
      "treb7uchet",
    ]);
  });

  it("sum", () => {
    expect(sum([1, 2, 3])).toBe(6);
  });

  it("first", () => {
    expect(first([1, 2, 3])).toBe(1);
  });

  it("last", () => {
    expect(last([1, 2, 3])).toBe(3);
  });
});
