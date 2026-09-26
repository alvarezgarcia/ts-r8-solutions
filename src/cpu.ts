import { R } from "@vitest/mocker/dist/types.d-BjI5eAwu";
import { CPU } from "./cpu.types";

const MEM_SIZE = 65536;

enum Register {
  A
};

export const CreateCPU = (): CPU => {
  const memory = new Array(MEM_SIZE).fill(0);
  const regs = new Uint8Array(Register.A + 1);

  let PC = 0;

  const step = () => {
    const opcode = memory[PC];
    PC++;

    if (opcode === 48) {
      regs[Register.A]++;
    }
  };

  return {
    get PC() {
      return PC;
    },
    get A() {
      return regs[Register.A];
    },
    set A(value: number) {
      regs[Register.A] = value;
    },
    memory,
    step,
  };
};
