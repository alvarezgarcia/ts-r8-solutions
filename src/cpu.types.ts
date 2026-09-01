export interface CPU {
  readonly PC: number;
  readonly memory: number[];
  step(): void;
};
