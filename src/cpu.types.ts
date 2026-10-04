export interface CPU {
  PC: number;
  A: number;
  memory: Uint8Array;
  step(): boolean;
  run(): void;
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
