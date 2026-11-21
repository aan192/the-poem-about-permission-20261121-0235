/**
 * @file main.ts
 * @description Reads entry-source.txt, validates it, and writes to /output/entry.txt.
 * 
 * DESIGN NOTES:
 * 1. Path Resolution: We use import.meta.url combined with fileURLToPath and dirname 
 *    to resolve entry-source.txt relative to this script file. This guarantees 
 *    that the file is correctly found regardless of the current working directory 
 *    from which Node.js is executed.
 * 2. Validation: The entry must be between 1 and 280 characters (Unicode code points). 
 *    We use [...content].length instead of .length to accurately count multi-byte 
 *    Unicode characters / emoji / code points rather than UTF-16 code units.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourcePath = join(__dirname, "entry-source.txt");
const content = readFileSync(sourcePath, "utf8");

// Validate length (1 to 280 unicode code points)
const charCount = [...content].length;
if (charCount < 1 || charCount > 280) {
  console.error(`Error: Entry length is ${charCount} characters (must be between 1 and 280).`);
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", content, "utf8");

console.log(`Validated and wrote entry (${charCount} chars) to /output/entry.txt`);
