const MEM_SIZE = 65536;

enum Register {
  A
};

export const CPU = () => {
  const memory = new Array(MEM_SIZE).fill(0);
  const regs = new Uint8Array(Register.A + 1);
  let PC = 0;

  const step = () => {
    const opcode = memory[PC];
    PC++;

    switch (opcode) {
      case 1:
        break;

      case 48:
        regs[Register.A]++;
        break;

      case 64:
        regs[Register.A]--;
        break;

      default:
        throw new Error(`Unknown opcode ${opcode}`)
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
