import { describe, expect, it } from "vitest";
import { CPU } from "./";

describe("CPU", () => {
  it("initialises CPU", () => {
    const cpu = CPU();

    expect(cpu.PC).toBe(0);
    expect(cpu.A).toBe(0);
    expect(cpu.memory[0]).toBe(0);
  });

  it("step increments PC", () => {
    const cpu = CPU();

    cpu.memory[0] = 1;

    cpu.step();
    expect(cpu.PC).toBe(1);
  });

  it("step increments PC twice", () => {
    const cpu = CPU();

    cpu.memory[0] = 1;
    cpu.memory[1] = 1;

    cpu.step();
    expect(cpu.PC).toBe(1);

    cpu.step();
    expect(cpu.PC).toBe(2);
  });

  it("inc increments A register", () => {
    const cpu = CPU();

    cpu.memory[0] = 48;

    cpu.step();
    expect(cpu.A).toBe(1);
  });
});
