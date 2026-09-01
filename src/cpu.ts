const MEM_SIZE = 256;

export const CPU = () => {
  const memory = new Uint8Array(MEM_SIZE);
  let pc = 0;
  let halt = false;

  const run = () => {
    while (!halt) {
      step();
    }
  };

  const step = () => {
    const opcode = memory[pc];
    pc++;
    switch (opcode) {
      case 0:
        halt = true;
        break;

      case 1:
        break;

      default:
        throw new Error(`Unknown opcode: 0x${opcode.toString(16)}`)
    }
  };

  return {
    get pc() {
      return pc;
    },
    memory,
    step,
    run
  };
};
