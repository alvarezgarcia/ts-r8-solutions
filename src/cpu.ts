import {
  CPU,
  Register8,
  Register16,
} from "./cpu.types";

const MEM_SIZE = 65536;

export const CreateCPU = (): CPU => {
  const memory = new Array(MEM_SIZE).fill(0);
  const regs8 = new Uint8Array(Register8.A + 1);
  const regs16 = new Uint16Array(Register16.PC + 1);

  const step = () => {
    const opcode = memory[regs16[Register16.PC]];
    regs16[Register16.PC]++;

    switch (opcode) {
      case 48: // inc
        regs8[Register8.A]++;
        break;

      case 64: // dec
        regs8[Register8.A]--;
        break;
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
  };
};
