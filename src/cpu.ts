const MEM_SIZE = 65536;

export const CPU = () => {
  const memory = new Array(MEM_SIZE).fill(0);
  let PC = 0;
  let rA = 0;

  const step = () => {
    const opcode = memory[PC];
    PC++;

    switch (opcode) {
      case 1:
        break;

      case 48:
        rA++;
        break;

      default:
        throw new Error(`Unknown opcode ${opcode}`)
    }
  };

  return {
    get PC() {
      return PC;
    },
    get A() {
      return rA;
    },
    memory,
    step,
  };
};
