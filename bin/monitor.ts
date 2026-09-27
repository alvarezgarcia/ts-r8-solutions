import { CreateCPU, disassemble } from "../src";
import { Prompt } from "./utils";

const handleProgramArg = (arg: string): Uint8Array => {
  let bytes: number[] = [];

  const parts = arg.split(' ');
  for (let p = 0; p < parts.length; p++) {
    const clean = parts[p].trim();
    if (clean.length === 0) {
      continue;
    }

    bytes.push(parseInt(clean, 10));
  }

  return new Uint8Array(bytes);
};

const main = async () => {
  const programArg = process.argv[2];

  const cpu = CreateCPU();
  if (programArg) {
    const program = handleProgramArg(programArg);
    cpu.memory.set(program);
  }

  const pr = Prompt(cpu);

  while (true) {
    const code = cpu.memory.subarray(cpu.PC, cpu.PC + 3);
    const asm = disassemble(code);
    console.log('  PC  A | NEXT');
    await pr.waitInput(asm);
    cpu.step();
  }
};

main();
