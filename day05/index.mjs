import { solveItPart1, solveItPart2 } from "./lib.mjs";

const runPart1 = async (filename) => {
  const answer = await solveItPart1(filename);
  console.log(`The part 1 answer for ${filename} is:`, answer);
};

const runPart2 = async (filename) => {
  const answer = await solveItPart2(filename);
  console.log(`The part 2 answer for ${filename} is:`, answer);
};

const main = async () => {
  await runPart1("test-input.txt");
  await runPart1("real-input.txt");
  // await runPart2("test-input.txt");
  // await runPart2("real-input.txt");
};

main();
