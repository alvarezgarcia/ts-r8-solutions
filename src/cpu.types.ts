export interface CPU {
  readonly PC: number;
  readonly A: number;
  readonly memory: number[];
  step(): void;
};
