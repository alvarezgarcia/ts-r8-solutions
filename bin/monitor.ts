import { CreateCPU, disassemble } from "../src";
import { Prompt, handleProgramArg } from "./utils";

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
    const [asm] = disassemble(code);
    console.log('  PC  A | NEXT');
    await pr.waitInput(asm);
    cpu.step();
  }
};

main();
