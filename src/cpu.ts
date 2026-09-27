import {
  CPU,
  Register8,
  Register16,
  OpCode,
} from "./cpu.types";

const MEM_SIZE = 65536;

export const CreateCPU = (): CPU => {
  const memory = new Uint8Array(MEM_SIZE);
  const regs8 = new Uint8Array(Register8.A + 1);
  const regs16 = new Uint16Array(Register16.PC + 1);

  const step = () => {
    const opcode = memory[regs16[Register16.PC]];
    regs16[Register16.PC]++;

    switch (opcode) {
      case OpCode.HALT:
        return false;

      case OpCode.INC:
        regs8[Register8.A]++;
        break;

      case OpCode.DEC:
        regs8[Register8.A]--;
        break;
    }

    return true;
  };

  const run = () => {
    while (step()) {
    }
  };

  return {
    get PC() {
      return regs16[Register16.PC];
    },
    set PC(position: number) {
      regs16[Register16.PC] = position;
    },
    get A() {
      return regs8[Register8.A];
    },
    set A(value: number) {
      regs8[Register8.A] = value;
    },
    memory,
    step,
    run
  };
};
