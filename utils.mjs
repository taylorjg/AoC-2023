import { dirname } from "path";
import { fileURLToPath } from "url";

// Problems trying to use __dirname in a .mjs file
// https://byby.dev/node-dirname-not-defined
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getDirname = () => {
  return __dirname;
};

export const sum = (ns) => ns.reduce((acc, n) => acc + n, 0);

export const first = (xs) => xs[0];
export const last = (xs) => xs[xs.length - 1];
