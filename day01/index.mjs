import { solveIt } from "./lib.mjs"

const run = async (filename) => {
  const answer = await solveIt(filename);
  console.log(`The answer for ${filename} is:`, answer);
};

const main = async () => {
  await run("test-input-part-1.txt");
  await run("test-input-part-2.txt");
  await run("real-input.txt");
};

main();
