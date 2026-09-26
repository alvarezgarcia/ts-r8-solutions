export interface CPU {
  readonly PC: number;
  memory: number[];
  A: number;
  step(): void;
};

export enum Register {
  A
};
