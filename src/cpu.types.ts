export interface CPU {
  PC: number;
  A: number;
  memory: Uint8Array;
  step(): void;
};

export enum Register8 {
  A
};

export enum Register16 {
  PC
};
