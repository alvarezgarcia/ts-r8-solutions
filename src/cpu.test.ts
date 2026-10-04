import { describe, expect, it } from "vitest";
import { CreateCPU } from "./cpu";
import { OpCode } from "./cpu.types";

describe("CPU", () => {
  it("initialises CPU", () => {
    const cpu = CreateCPU();

    expect(cpu.PC).toBe(0);
    expect(cpu.A).toBe(0);
    expect(cpu.memory[0]).toBe(0);
  });

  it("step increments PC", () => {
    const cpu = CreateCPU();

    cpu.step();
    expect(cpu.PC).toBe(1);

    cpu.step();
    expect(cpu.PC).toBe(2);
  });

  it("inc increments A register", () => {
    const cpu = CreateCPU();

    cpu.memory[0] = OpCode.INC;

    cpu.step();
    expect(cpu.A).toBe(1);
  });

  it("inc wraps A register from 255 to 0", () => {
    const cpu = CreateCPU();

    cpu.memory[0] = OpCode.INC;
    cpu.A = 255;

    cpu.step();
    expect(cpu.A).toBe(0);
  });

  it("dec wraps A register from 0 to 255", () => {
    const cpu = CreateCPU();

    cpu.memory[0] = OpCode.DEC;
    cpu.A = 0;

    cpu.step();
    expect(cpu.A).toBe(255);
  });

  it("step wraps PC register from 65535 to 0", () => {
    const cpu = CreateCPU()

    cpu.PC = 65535;

    cpu.step();
    expect(cpu.PC).toBe(0);
  });

  it("memory is bytes", () => {
    const cpu = CreateCPU();

    cpu.memory[0] = 256; // We exceed the max value of a 1 byte unsigned integer (255) so we have again 0
    expect(cpu.memory[0]).toBe(0);
  });

  it("runs until halted", () => {
    const cpu = CreateCPU();

    cpu.memory[0] = OpCode.INC;
    cpu.memory[1] = OpCode.HALT;

    cpu.run();
    expect(cpu.PC).toBe(2);
  });

  it("loads accumulator", () => {
    const cpu = CreateCPU();

    cpu.memory[0] = OpCode.LD;
    cpu.memory[1] = 5;

    cpu.step();
    expect(cpu.A).toBe(5);
    expect(cpu.PC).toBe(2);
  });

  it("add adds to accumulator", () => {
    const cpu = CreateCPU();

    cpu.A = 1;
    cpu.memory[0] = OpCode.ADD;
    cpu.memory[1] = 2;

    cpu.step();
    expect(cpu.A).toBe(3);
    expect(cpu.PC).toBe(2);
  });
});
