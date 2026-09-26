import readline from "node:readline/promises";
import { type CPU } from "../src";

const padNumber = <T>(line: T, offset: number, value = '0') =>
  String(line).padStart(offset, value);

export const Prompt = (cpu: CPU) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const waitInput = async () => {
    const regPCLine = padNumber<number>(cpu.PC, 4);
    const regALine = padNumber<number>(cpu.A, 2);
    const l = `${regPCLine} ${regALine} >`;

    await rl.question(l);
  };

  return {
    waitInput
  };
};
