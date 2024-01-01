import { readLinesFromFile, sum, product, reverseString, range } from "./utils.mjs";

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

  it("product", () => {
    expect(product([2, 3, 4])).toBe(24);
  });

  it("reverseString", () => {
    expect(reverseString("abc")).toBe("cba");
  });

  it("range", () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
  });
});
