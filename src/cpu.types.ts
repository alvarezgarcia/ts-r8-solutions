export interface CPU {
  readonly memory: number[];
  PC: number;
  A: number;
  step(): void;
};

export enum Register8 {
  A
};

export enum Register16 {
  PC
};
