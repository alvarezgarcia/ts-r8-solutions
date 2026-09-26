import { CPU, Register } from "./cpu.types";

const MEM_SIZE = 65536;

export const CreateCPU = (): CPU => {
  const memory = new Array(MEM_SIZE).fill(0);
  const regs = new Uint8Array(Register.A + 1);

  let PC = 0;

  const step = () => {
    const opcode = memory[PC];
    PC++;

    switch (opcode) {
      case 48: // inc
        regs[Register.A]++;
        break;

      case 64: // dec
        regs[Register.A]--;
        break;
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
