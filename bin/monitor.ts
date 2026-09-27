import { readFileSync } from "node:fs";

import { Prompt, handleProgramArg, die } from "./utils";
import { CreateCPU, disassemble } from "../src";

const usage = 'Usage: npm run monitor FILEPATH';

const main = async () => {
  const filePathArg = process.argv[2];

  if (!filePathArg) {
    return die(usage);
  }

  try {
    const program: Uint8Array = readFileSync(filePathArg);
    const cpu = CreateCPU();
    cpu.memory.set(program);

    const pr = Prompt(cpu);

    while (true) {
      const code = cpu.memory.subarray(cpu.PC, cpu.PC + 3);
      const [asm] = disassemble(code);
      console.log('  PC  A | NEXT');
      await pr.waitInput(asm);
      cpu.step();
    }
  } catch (err) {
    return die(err.message);
  }
};

main();
