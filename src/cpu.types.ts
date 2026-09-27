export interface CPU {
  PC: number;
  A: number;
  memory: number[];
  step(): void;
};

export enum Register8 {
  A
};

export enum Register16 {
  PC
};
