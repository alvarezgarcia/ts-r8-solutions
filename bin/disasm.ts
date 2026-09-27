import { readFileSync } from "node:fs";

import { die } from "./utils";
import { disassemble } from "../src";

const usage = 'Usage: npm run disasm FILEPATH';

const main = () => {
  const filePathArg = process.argv[2];

  if (!filePathArg) {
    return die(usage);
  }

  try {
    const program: Uint8Array = readFileSync(filePathArg);

    let bytes = 0;
    let asm = '';

    for (let b = 0; b < program.length; b += bytes) {
      ([asm, bytes] = disassemble(program.subarray(b)));
      console.log(asm);
    }
  } catch (err) {
    return die(err.message);
  }
};

main();
