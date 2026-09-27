import readline from "node:readline/promises";
import { type CPU } from "../src";

const padNumber = <T>(line: T, offset: number, value = '0') =>
  String(line).padStart(offset, value);

export const Prompt = (cpu: CPU) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const waitInput = async (asm: string) => {
    const regPCLine = padNumber<number>(cpu.PC, 4);
    const regALine = padNumber<number>(cpu.A, 2);
    const l = `${regPCLine} ${regALine} | ${asm}\n>`;

    await rl.question(l);
  };

  return {
    waitInput
  };
};

export const handleProgramArg = (arg: string): Uint8Array => {
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

export const die = (msg: string) => {
  console.error(msg);
  process.exit(1);
};
