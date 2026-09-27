import { describe, expect, it } from "vitest";
<<<<<<< HEAD
<<<<<<< HEAD
import { CreateCPU, disassemble } from "./cpu";
=======
import { CreateCPU } from "./cpu";
>>>>>>> aee9513 (Added opcode constants)
=======
import { CreateCPU, disassemble } from "./cpu";
>>>>>>> db29849 (Disassemble 1-byte instructions)
import { OpCode } from "./cpu.types";

describe("CPU", () => {
  it("initialises CPU", () => {
    const cpu = CreateCPU();

    expect(cpu.PC).toBe(0x0000);
    expect(cpu.A).toBe(0x00);
    expect(cpu.zero).toBe(false);
    expect(cpu.memory[0]).toBe(0x00);
  });

  it("step increments PC", () => {
    const cpu = CreateCPU();

    cpu.step();
    expect(cpu.PC).toBe(0x0001);

    cpu.step();
    expect(cpu.PC).toBe(0x0002);
  });

  it("inc increments A register", () => {
    const cpu = CreateCPU();
    cpu.zero = true;

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4b6ffbf (Add runProgram)
    const program = new Uint8Array([
      OpCode.INC_A,
      OpCode.HALT,
    ]);
<<<<<<< HEAD

    cpu.runProgram(program);
=======
    cpu.memory[0] = OpCode.INC_A;
>>>>>>> aee9513 (Added opcode constants)

<<<<<<< HEAD
=======

    cpu.runProgram(program);
>>>>>>> 4b6ffbf (Add runProgram)
    expect(cpu.A).toBe(1);
=======
    expect(cpu.A).toBe(0x01);
>>>>>>> 8d12290 (Switched to hex numbers)
    expect(cpu.zero).toBe(false);
  });

  it("inc wraps A register from FF to 0", () => {
    const cpu = CreateCPU();
<<<<<<< HEAD
=======

<<<<<<< HEAD
    cpu.memory[0] = OpCode.INC_A;
>>>>>>> aee9513 (Added opcode constants)
    cpu.A = 255;

    const program = new Uint8Array([
      OpCode.INC_A,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

<<<<<<< HEAD
=======
    const program = new Uint8Array([
      OpCode.INC_A,
      OpCode.HALT,
    ]);

    cpu.A = 255;
    cpu.runProgram(program);
>>>>>>> 4b6ffbf (Add runProgram)
    expect(cpu.A).toBe(0);
=======
    expect(cpu.A).toBe(0x00);
>>>>>>> 8d12290 (Switched to hex numbers)
    expect(cpu.zero).toBe(true);
  });

  it("dec decrements A register", () => {
    const cpu = CreateCPU();
    cpu.A = 0x01;

    const program = new Uint8Array([
      OpCode.DEC_A,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.A).toBe(0x00);
    expect(cpu.zero).toBe(true);
  });

  it("dec wraps A register from 00 to FF", () => {
    const cpu = CreateCPU();
<<<<<<< HEAD
<<<<<<< HEAD
=======

<<<<<<< HEAD
    cpu.memory[0] = OpCode.DEC_A;
>>>>>>> aee9513 (Added opcode constants)
    cpu.A = 0;
=======
    cpu.A = 0x00;
>>>>>>> 8d12290 (Switched to hex numbers)
    cpu.zero = true;

=======
>>>>>>> 4b6ffbf (Add runProgram)
    const program = new Uint8Array([
      OpCode.DEC_A,
      OpCode.HALT,
    ]);
<<<<<<< HEAD

    cpu.runProgram(program);

<<<<<<< HEAD
=======

    cpu.A = 0;
    cpu.runProgram(program);
>>>>>>> 4b6ffbf (Add runProgram)
    expect(cpu.A).toBe(255);
=======
    expect(cpu.A).toBe(0xFF);
>>>>>>> 8d12290 (Switched to hex numbers)
    expect(cpu.zero).toBe(false);
  });

  it("step wraps PC register from FFFF to 0000", () => {
    const cpu = CreateCPU()
    cpu.PC = 0xFFFF;

    cpu.step();

    expect(cpu.PC).toBe(0x0000);
  });

  it("memory is bytes", () => {
    const cpu = CreateCPU();
    cpu.memory[0] = 256; // We exceed the max value of a 1 byte unsigned integer (255) so we have again 0

    expect(cpu.memory[0]).toBe(0x00);
  });

  it("runs until halted", () => {
    const cpu = CreateCPU();

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4b6ffbf (Add runProgram)
    const program = new Uint8Array([
      OpCode.INC_A,
      OpCode.HALT,
    ]);
<<<<<<< HEAD

    cpu.runProgram(program);
    expect(cpu.PC).toBe(0x0002);
  });

  it("loads accumulator", () => {
    const cpu = CreateCPU();
    cpu.A = 0x0A;
    cpu.zero = true;

    const program = new Uint8Array([
      OpCode.LD_A, 0x05,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.A).toBe(0x05);
    expect(cpu.PC).toBe(0x0003);
    expect(cpu.zero).toBe(false);
  });

  it("ld sets zero flag", () => {
    const cpu = CreateCPU();

    const program = new Uint8Array([
      OpCode.LD_A, 0x00,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.zero).toBe(true);
  });

  it("add adds to accumulator", () => {
    const cpu = CreateCPU();
    cpu.A = 0x01;
    cpu.zero = true;

    const program = new Uint8Array([
      OpCode.ADD_A, 0x02,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.A).toBe(0x03);
    expect(cpu.PC).toBe(0x0003);
    expect(cpu.zero).toBe(false);
  });

  it("add sets zero flag", () => {
    const cpu = CreateCPU();
    cpu.A = 0x01;

    const program = new Uint8Array([
      OpCode.ADD_A, 0xFF,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.zero).toBe(true);
  });

  it("jmp jumps to specified address", () => {
    const cpu = CreateCPU();

    const program = new Uint8Array([
      OpCode.JMP, 0x05, 0x00,
      OpCode.INC_A,
      OpCode.HALT,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.A).toBe(0x00);
    expect(cpu.PC).toBe(0x0006);
  });

  it("bra always branches", () => {
    const cpu = CreateCPU();

    const program = new Uint8Array([
      OpCode.BRA, 0x01,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.PC).toBe(0x0004);
  });

  it("beq branches if zero", () => {
    const cpu = CreateCPU();

    const program = new Uint8Array([
<<<<<<< HEAD
      OpCode.LD_A, 0,
      OpCode.BEQ, 1,
=======
      OpCode.LD_A, 10,
      OpCode.DEC_A,
      OpCode.BEQ, 3,
      OpCode.JMP, 2, 0,
>>>>>>> 4a909c9 (Add beq opcode)
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

<<<<<<< HEAD
    expect(cpu.PC).toBe(6);
=======
    expect(cpu.A).toBe(0);
    expect(cpu.PC).toBe(9);
>>>>>>> 4a909c9 (Add beq opcode)
  });

  it("beq does not branch if zero flag clear", () => {
    const cpu = CreateCPU();

    const program = new Uint8Array([
      OpCode.LD_A, 0x01,
      OpCode.BEQ, 0x01,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.PC).toBe(0x0005);
  });
<<<<<<< HEAD
<<<<<<< HEAD

  it("cmp sets zero flag if operand is equal", () => {
    const cpu = CreateCPU();

    const program = new Uint8Array([
      OpCode.LD_A, 1,
      OpCode.CMP_A, 1,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.zero).toBe(true);
  });

  it("cmp clears zero flag if operand is not equal", () => {
    const cpu = CreateCPU();

    const program = new Uint8Array([
      OpCode.LD_A, 0,
      OpCode.CMP_A, 1,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.zero).toBe(false);
  });
=======
>>>>>>> db29849 (Disassemble 1-byte instructions)

  it("cmp sets zero flag if operand is equal", () => {
    const cpu = CreateCPU();

    const program = new Uint8Array([
      OpCode.LD_A, 0x01,
      OpCode.CMP_A, 0x01,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.zero).toBe(true);
  });

  it("cmp clears zero flag if operand is not equal", () => {
    const cpu = CreateCPU();

    const program = new Uint8Array([
      OpCode.LD_A, 0x00,
      OpCode.CMP_A, 0x01,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.zero).toBe(false);
  });

  it("disassemble function correctly disassembles code", () => {
    const cases = [
      {
<<<<<<< HEAD
<<<<<<< HEAD
        code: new Uint8Array([OpCode.BEQ, 3]),
        source: "beq 3",
=======
        code: new Uint8Array([OpCode.BEQ, 0x03]),
        source: "beq 0x03",
>>>>>>> 8d12290 (Switched to hex numbers)
      },
      {
        code: new Uint8Array([OpCode.CMP_A, 0x01]),
        source: "cmp a, 0x01",
      },
      {
        code: new Uint8Array([OpCode.DEC_A]),
        source: "dec a",
      },
      {
        code: new Uint8Array([OpCode.HALT]),
        source: "halt",
      },
      {
        code: new Uint8Array([OpCode.INC_A]),
        source: "inc a",
      },
      {
        code: new Uint8Array([OpCode.JMP, 0x02, 0x00]),
        source: "jmp 0x0002",
      },
      {
        code: new Uint8Array([OpCode.LD_A, 0x10]),
        source: "ld a, 0x10",
      },
      {
        code: new Uint8Array([OpCode.TRAP, 0x20]),
        source: "trap 0x20"
      },
      {
        code: new Uint8Array([255]),
=======
        code:   OpCode.DEC_A,
        source: "dec a",
      },
      {
        code:   OpCode.HALT,
        source: "halt",
      },
      {
        code:   OpCode.INC_A,
        source: "inc a",
      },
      {
        code:   255,
>>>>>>> db29849 (Disassemble 1-byte instructions)
        source: "???",
      },
    ];

    for (const c of cases) {
<<<<<<< HEAD
<<<<<<< HEAD
      const [source, bytes] = disassemble(c.code);

      expect(source).toBe(c.source);
      expect(bytes).toBe(c.code.length);
    }
  });
=======
    cpu.memory[0] = 48; // inc a
    cpu.memory[1] = 0;
=======
    cpu.memory[0] = OpCode.INC_A;
    cpu.memory[1] = OpCode.HALT;
>>>>>>> aee9513 (Added opcode constants)
=======
>>>>>>> 4b6ffbf (Add runProgram)

    cpu.runProgram(program);
    expect(cpu.PC).toBe(2);
  });
<<<<<<< HEAD
>>>>>>> d5bbd40 (Run until halted)
=======

  it("loads accumulator", () => {
    const cpu = CreateCPU();

    cpu.A = 10;
    const program = new Uint8Array([
      OpCode.LD_A, 5,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);
    expect(cpu.A).toBe(5);
    expect(cpu.PC).toBe(3);
  });
<<<<<<< HEAD
>>>>>>> 31c6f01 (Add ld a opcode)
=======

  it("add adds to accumulator", () => {
    const cpu = CreateCPU();

    const program = new Uint8Array([
      OpCode.ADD_A, 2,
      OpCode.HALT
    ]);
    cpu.A = 1;

    cpu.runProgram(program);
    expect(cpu.A).toBe(3);
    expect(cpu.PC).toBe(3);
  });
>>>>>>> b7eeb9d (Add add a opcode)
=======
>>>>>>> 4a909c9 (Add beq opcode)
=======
      const source = disassemble(c.code);
=======
      const [source, bytes] = disassemble(c.code);

>>>>>>> a05896b (disasm cli)
      expect(source).toBe(c.source);
      expect(bytes).toBe(c.code.length);
    }
  });
>>>>>>> db29849 (Disassemble 1-byte instructions)
});
