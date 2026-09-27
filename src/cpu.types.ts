export interface CPU {
  PC: number;
  A: number;
  memory: Uint8Array;
<<<<<<< HEAD
<<<<<<< HEAD
  zero: boolean;
  runProgram(program: Uint8Array): void;
=======
>>>>>>> d5bbd40 (Run until halted)
=======
  runProgram(program: Uint8Array): void;
>>>>>>> 4b6ffbf (Add runProgram)
  step(): boolean;
};

export enum Register8 {
  A
};

export enum Register16 {
  PC
};

export enum OpCode {
<<<<<<< HEAD
  HALT = 0,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 31c6f01 (Add ld a opcode)
  LD_A = 16,
  INC_A = 48,
  DEC_A = 64,
  ADD_A = 80,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0def0c2 (Add cmp opcode)
  CMP_A = 112,
  BRA = 240,
  BEQ = 241,
  JMP = 247,
  TRAP = 249,
=======
  INC_A = 48,
  DEC_A = 64,
>>>>>>> aee9513 (Added opcode constants)
=======
>>>>>>> b7eeb9d (Add add a opcode)
=======
  HALT = 0x00,
  LD_A = 0x10,
  INC_A = 0x30,
  DEC_A = 0x40,
  ADD_A = 0x50,
  CMP_A = 0x70,
  BRA = 0xF0,
  BEQ = 0xF1,
  JMP = 0xF7,
  TRAP = 0xF9,

  TRAP_PRINT = 0x20,
>>>>>>> 8d12290 (Switched to hex numbers)
};
