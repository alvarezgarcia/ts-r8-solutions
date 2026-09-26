export interface CPU {
  readonly PC: number;
  readonly memory: number[];
  A: number;
  step(): void;
};
