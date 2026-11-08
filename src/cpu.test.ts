import { describe, expect, it } from "vitest";

import { CreateCPU, disassemble, getTarget } from "./cpu";
import { OpCode, Register8 } from "./cpu.types";

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

    const program = new Uint8Array([
      OpCode.INC_A,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.A).toBe(0x01);
    expect(cpu.zero).toBe(false);
  });

  it("inc wraps A register from FF to 0", () => {
    const cpu = CreateCPU();
    cpu.A = 255;

    const program = new Uint8Array([
      OpCode.INC_A,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.A).toBe(0x00);
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
    cpu.A = 0x00;
    cpu.zero = true;

    const program = new Uint8Array([
      OpCode.DEC_A,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.A).toBe(0xFF);
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

    const program = new Uint8Array([
      OpCode.INC_A,
      OpCode.HALT,
    ]);

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
      OpCode.LD_A, 0x00,
      OpCode.BEQ, 0x01,
      OpCode.HALT,
    ]);

    cpu.runProgram(program);

    expect(cpu.PC).toBe(0x0006);
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

  it("getTarget function extracts register id from opcode", () => {
    const cases = [
      {
        opcode: OpCode.ADD_A,
        target: Register8.A
      },
      {
        opcode: OpCode.ADD_B,
        target: Register8.B,
      },
      {
        opcode: OpCode.CMP_A,
        target: Register8.A,
      },
      {
        opcode: OpCode.CMP_B,
        target: Register8.B,
      },
      {
        opcode: OpCode.DEC_A,
        target: Register8.A,
      },
      {
        opcode: OpCode.DEC_B,
        target: Register8.B,
      },
      {
        opcode: OpCode.INC_A,
        target: Register8.A,
      },
      {
        opcode: OpCode.INC_B,
        target: Register8.B,
      },
      {
        opcode: OpCode.LD_A,
        target: Register8.A,
      },
      {
        opcode: OpCode.LD_B,
        target: Register8.B,
      }
    ];

    for (const c of cases) {
      const targetRegister = getTarget(c.opcode);
      expect(targetRegister).toBe(c.target);
    }
  });

  it("disassemble function correctly disassembles code", () => {
    const cases = [
      {
        code: new Uint8Array([OpCode.BEQ, 0x03]),
        source: "beq 0x03",
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
        source: "???",
      },
    ];

    for (const c of cases) {
      const [source, bytes] = disassemble(c.code);

      expect(source).toBe(c.source);
      expect(bytes).toBe(c.code.length);
    }
  });
});
