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
  LD_A = 16,
  INC_A = 48,
  DEC_A = 64,
};
