import { describe, expect, it } from "vitest";
import { CPU, Opcode } from "./";

describe("CPU", () => {
  it("initialises CPU", () => {
    const cpu = CPU();

    expect(cpu.pc).toBe(0);
    expect(cpu.memory[0]).toBe(0);
  });

  it("step increments PC", () => {
    const cpu = CPU();

    cpu.pc = 256;
    cpu.memory[cpu.pc] = Opcode.NOP;

    cpu.step();
    expect(cpu.pc).toBe(257);
  });
});
