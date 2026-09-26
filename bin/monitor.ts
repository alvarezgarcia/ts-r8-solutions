import { CreateCPU } from "../src";
import { Prompt } from "./utils";

const main = async () => {
  const cpu = CreateCPU();

  console.log('  PC');
  const pr = Prompt(cpu);

  while (true) {
    await pr.waitInput();
    cpu.step();
  }
};

main();
