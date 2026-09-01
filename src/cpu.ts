const MEM_SIZE = 256;

export const CPU = () => {
  const memory = new Uint8Array(MEM_SIZE);
  let halt = false;
  let pc = 0;

  const step = () => {
    const opcode = memory[pc];
    pc++;

    switch (opcode) {
      case 1:
        break;

      case 0:
        halt = true;
        break;

      default:
        throw new Error(`Unknown opcode: 0x${opcode.toString(16)}`)
    }
  };

  const run = () => {
    while (!halt) {
      step();
    }
  };

  return {
    get pc() {
      return pc;
    },
    set pc(value: number) {
      value = 0;
    },
    memory,
    step,
    run
  };
};
