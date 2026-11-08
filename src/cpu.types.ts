export interface CPU {
  PC: number;
  A: number;
  memory: Uint8Array;
  zero: boolean;
  runProgram(program: Uint8Array): void;
  step(): boolean;
  run(): void;
};

export enum Register8 {
  A = 0x00,
  B = 0x01,
};

export enum Register16 {
  PC
};

export enum OpCode {
  HALT = 0x00,
  LD_A = 0x10,
  LD_B = 0x11,
  INC_A = 0x30,
  INC_B = 0x31,
  DEC_A = 0x40,
  DEC_B = 0x41,
  ADD_A = 0x50,
  ADD_B = 0x51,
  CMP_A = 0x70,
  CMP_B = 0x71,
  BRA = 0xF0,
  BEQ = 0xF1,
  JMP = 0xF7,
  TRAP = 0xF9,

  TRAP_PRINT = 0x20,
};
