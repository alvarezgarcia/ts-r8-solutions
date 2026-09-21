import { OpCode } from "./opcodes";

const MEM_SIZE = 65536;

enum Register {
  A
};

enum Register16 {
  PC
};

export const CPU = () => {
  const memory = new Uint8Array(MEM_SIZE);
  const regs8 = new Uint8Array(Register.A + 1);
  const regs16 = new Uint16Array(Register16.PC + 1);
  let halt = false;

  const step = () => {
    const opcode = memory[regs16[Register16.PC]];
    regs16[Register16.PC]++;

    switch (opcode) {
      case OpCode.HALT:
        halt = true;
        break;

      case OpCode.NOP:
        break;

      case OpCode.INC:
        regs8[Register.A]++;
        break;

      case OpCode.DEC:
        regs8[Register.A]--;
        break;

      default:
        throw new Error(`Unknown opcode: 0x${opcode.toString(16)}`)
    }
  };

  const run = () => {
    while (!halt) {
      step();
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
      return regs8[Register.A];
    },
    set A(value: number) {
      regs8[Register.A] = value;
    },
    memory,
    step,
    run
  };
};
