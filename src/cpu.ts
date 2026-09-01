import { CPU } from "./cpu.types";

const MEM_SIZE = 65536;

export const CreateCPU = (): CPU => {
  const memory = new Array(MEM_SIZE).fill(0);
  let PC = 0;

  const step = () => {
    PC++;
  };

  return {
    get PC() {
      return PC;
    },
    memory,
    step,
  };
};
