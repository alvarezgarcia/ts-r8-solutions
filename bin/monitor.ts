<<<<<<< HEAD
import { readFileSync } from "node:fs";
=======
import { CreateCPU, disassemble } from "../src";
import { Prompt } from "./utils";
>>>>>>> d3ad666 (Disassemble next opcode)

import { Prompt, handleProgramArg, die } from "./utils";
import { CreateCPU, disassemble } from "../src";

const usage = 'Usage: npm run monitor FILEPATH';

const main = async () => {
  const filePathArg = process.argv[2];

  if (!filePathArg) {
    return die(usage);
  }

<<<<<<< HEAD
  try {
    const program: Uint8Array = readFileSync(filePathArg);

    const cpu = CreateCPU();
    cpu.memory.set(program);
    cpu.PC = 0x0000;

    const pr = Prompt(cpu);

    while (true) {
      const code = cpu.memory.subarray(cpu.PC, cpu.PC + 3);
      const [asm] = disassemble(code);
      console.log('  PC  A | NEXT');
      const input = await pr.waitInput(asm);
      if (input === 'g') {
        cpu.run();
      } else {
        cpu.step();
      }
    }
  } catch (err) {
    return die(err.message);
=======
  const pr = Prompt(cpu);

  while (true) {
<<<<<<< HEAD
    const code = cpu.memory[cpu.PC];
    const asm = disassemble(code);
=======
    const code = cpu.memory.subarray(cpu.PC, cpu.PC + 3);
    const [asm] = disassemble(code);
>>>>>>> a05896b (disasm cli)
    console.log('  PC  A | NEXT');
    await pr.waitInput(asm);
    cpu.step();
>>>>>>> d3ad666 (Disassemble next opcode)
  }
};

main();
