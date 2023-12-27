import { readLinesFromFile, lineToNumber, linesToNumbers, solveIt } from "./lib.mjs";

describe("lib test", () => {
  it("readLinesFromFile", async () => {
    const actual = await readLinesFromFile("test-input-part-1.txt");
    expect(actual).toEqual([
      "1abc2",
      "pqr3stu8vwx",
      "a1b2c3d4e5f",
      "treb7uchet",
    ]);
  });

  it("read number from line", () => {
    expect(lineToNumber("1abc2")).toBe(12);
  });

  it("read number from line when only one digit present", () => {
    expect(lineToNumber("treb7uchet")).toBe(77);
  });

  it("read numbers from multiple lines", () => {
    expect(linesToNumbers([
      "1abc2",
      "pqr3stu8vwx",
      "a1b2c3d4e5f",
      "treb7uchet",
    ])).toEqual([12, 38, 15, 77]);
  });

  it("read number from line (part 2)", () => {
    expect(lineToNumber("zoneight234")).toBe(14);
  });

  it("read numbers from multiple lines (part 2)", () => {
    expect(linesToNumbers([
      "two1nine",
      "eightwothree",
      "abcone2threexyz",
      "xtwone3four",
      "4nineeightseven2",
      "zoneight234",
      "7pqrstsixteen",
    ])).toEqual([29, 83, 13, 24, 42, 14, 76]);
  });

  it("solveIt (part 1)", async () => {
    const actual = await solveIt("test-input-part-1.txt");
    expect(actual).toBe(142);
  });

  it("solveIt (part 2)", async () => {
    const actual = await solveIt("test-input-part-2.txt");
    expect(actual).toBe(281);
  });
});
