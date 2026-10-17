export interface CPU {
  PC: number;
  A: number;
  memory: Uint8Array;
  runProgram(program: Uint8Array): void;
  step(): boolean;
};

export enum Register8 {
  A
};

export enum Register16 {
  PC
};

export enum OpCode {
  HALT = 0,
  LD_A = 16,
  INC_A = 48,
  DEC_A = 64,
  ADD_A = 80,
  JMP = 247,
};
