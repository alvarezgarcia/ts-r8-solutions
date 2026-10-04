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
  LD = 16,
  INC = 48,
  DEC = 64,
  ADD = 80,
};
