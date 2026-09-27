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
  let zero = false;

  const runProgram = (program: Uint8Array) => {
    memory.set(program);
    regs16[Register16.PC] = 0;
    run();
  };

  const fetch = () => {
    const value = memory[regs16[Register16.PC]];
    regs16[Register16.PC]++;
    return value;
  };

  const updateZero = (value: number) => {
    zero = value === 0;
  };

  const step = () => {
    const opcode = fetch();

    switch (opcode) {
      case OpCode.HALT:
        return false;

      case OpCode.LD_A:
        const operand = fetch();
        regs8[Register8.A] = operand;
        updateZero(regs8[Register8.A]);
        break;

      case OpCode.INC_A:
        regs8[Register8.A]++;
        updateZero(regs8[Register8.A]);
        break;

      case OpCode.DEC_A:
        regs8[Register8.A]--;
        updateZero(regs8[Register8.A]);
        break;

      case OpCode.ADD_A:
        const addOperand = fetch();
        regs8[Register8.A] += addOperand;
        updateZero(regs8[Register8.A]);
        break;

      case OpCode.BRA:
        const displacement = fetch();
        regs16[Register16.PC] += displacement;
        break;

      case OpCode.JMP:
        const addressLow = fetch();
        const addressHigh = fetch();
        const newAddress = (addressHigh << 8) | addressLow;
        regs16[Register16.PC] = newAddress;
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
    set zero(value: boolean) {
      zero = value;
    },
    get zero() {
      return zero;
    },
    memory,
    step,
    runProgram
  };
};
