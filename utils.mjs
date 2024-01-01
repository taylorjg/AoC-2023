import { promises as fs } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// Problems trying to use __dirname in a .mjs file
// https://byby.dev/node-dirname-not-defined
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const readLinesFromFile = async (folder, filename) => {
  const path = resolve(__dirname, folder, filename);
  const text = await fs.readFile(path, "utf-8");
  return text.split(/\n/).filter(Boolean);
};

export const sum = (ns) => ns.reduce((acc, n) => acc + n, 0);
export const product = (ns) => ns.reduce((acc, n) => acc * n, 1);

export const reverseString = (s) => Array.from(s).reverse().join("");

export const range = n => Array.from(Array(n).keys());
