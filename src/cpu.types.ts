export interface CPU {
  readonly PC: number;
  readonly A: number;
  memory: number[];
  step(): void;
};
