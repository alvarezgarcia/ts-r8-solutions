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
    regs16[Register16.PC] = 0x00;
    run();
  };

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
    zero = value === 0x00;
  };

<<<<<<< HEAD
=======
  const fetch = () => {
    const value = memory[regs16[Register16.PC]];
    regs16[Register16.PC]++;
    return value;
  };

>>>>>>> e38603e (Add fetch)
  const step = () => {
    const opcode = fetch();

    switch (opcode) {
<<<<<<< HEAD
<<<<<<< HEAD
      case OpCode.HALT:
        return false;

      case OpCode.LD_A:
<<<<<<< HEAD
<<<<<<< HEAD
        const operand = fetch();
        regs8[Register8.A] = operand;
        updateZero(regs8[Register8.A]);
=======
      case 0: // halt
=======
      case OpCode.HALT:
>>>>>>> aee9513 (Added opcode constants)
        return false;
=======
        const operand = memory[regs16[Register16.PC]];
        regs16[Register16.PC]++;
=======
        const operand = fetch();
>>>>>>> e38603e (Add fetch)
        regs8[Register8.A] = operand;
        break;
>>>>>>> 31c6f01 (Add ld a opcode)

      case OpCode.INC_A:
        regs8[Register8.A]++;
>>>>>>> d5bbd40 (Run until halted)
        break;

<<<<<<< HEAD
      case OpCode.INC_A:
        regs8[Register8.A]++;
        updateZero(regs8[Register8.A]);
=======
      case OpCode.DEC_A:
        regs8[Register8.A]--;
>>>>>>> aee9513 (Added opcode constants)
        break;

      case OpCode.DEC_A:
        regs8[Register8.A]--;
        updateZero(regs8[Register8.A]);
        break;

      case OpCode.ADD_A:
        const addOperand = fetch();
        regs8[Register8.A] += addOperand;
<<<<<<< HEAD
        updateZero(regs8[Register8.A]);
        break;

      case OpCode.CMP_A:
        const cmpOperand = fetch();
        zero = regs8[Register8.A] === cmpOperand;
        break;

      case OpCode.BRA:
        const braDisplacement = fetch();
        regs16[Register16.PC] += braDisplacement;
        break;

      case OpCode.BEQ:
        const beqDisplacement = fetch();
        if (zero) {
          regs16[Register16.PC] += beqDisplacement;
        }
        break;

      case OpCode.JMP:
        const addressLow = fetch();
        const addressHigh = fetch();
        const newAddress = (addressHigh << 8) | addressLow;
        regs16[Register16.PC] = newAddress;
        break;

      case OpCode.TRAP:
        const trapOperand = fetch();
        if (trapOperand === OpCode.TRAP_PRINT) {
          process.stdout.write(String.fromCharCode(regs8[Register8.A]));
        }
        break;
    }

    return true;
  };

  const run = () => {
    while (step()) {
=======
        break;
>>>>>>> b7eeb9d (Add add a opcode)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    runProgram,
=======
>>>>>>> d5bbd40 (Run until halted)
    run
=======
    runProgram
>>>>>>> 4b6ffbf (Add runProgram)
  };
};

const formatByte = (code: Uint8Array): string => {
  if (code.length < 1) {
    return "???"
  }

  return `0x${code[0].toString(16).toUpperCase().padStart(2, '0')}`;
};

const formatWord = (code: Uint8Array): string => {
  if (code.length < 2) {
    return "???"
  }

  const addressLow = code[0];
  const addressHigh = code[1];
  const newAddress = (addressHigh << 8) | addressLow;

  return `0x${newAddress.toString(16).toUpperCase().padStart(4, '0')}`;
};

export const disassemble = (code: Uint8Array): [string, number] => {
  switch (code[0]) {
    case OpCode.HALT:
      return ["halt", 1];

    case OpCode.LD_A:
      return [`ld a, ${formatByte(code.subarray(1))}`, 2];

    case OpCode.INC_A:
      return ["inc a", 1];

    case OpCode.DEC_A:
      return ["dec a", 1];
<<<<<<< HEAD

    case OpCode.CMP_A:
      return [`cmp a, ${formatByte(code.subarray(1))}`, 2];
=======
>>>>>>> a05896b (disasm cli)

    case OpCode.CMP_A:
      return [`cmp a, ${formatByte(code.subarray(1))}`, 2];

    case OpCode.BEQ:
      return [`beq ${formatByte(code.subarray(1))}`, 2];

    case OpCode.JMP:
      return [`jmp ${formatWord(code.subarray(1))}`, 3];
<<<<<<< HEAD

    case OpCode.TRAP:
      return [`trap ${formatByte(code.subarray(1))}`, 2];

    default:
      return ["???", 1];
=======
    runProgram,
  };
};

export const disassemble = (code: number): string => {
  switch (code) {
    case OpCode.DEC_A:
      return "dec a"
    case OpCode.HALT:
      return "halt"
    case OpCode.INC_A:
      return "inc a"
    default:
      return "???"
>>>>>>> db29849 (Disassemble 1-byte instructions)
=======

    default:
      return ["???", 1];
>>>>>>> a05896b (disasm cli)
  }
};
