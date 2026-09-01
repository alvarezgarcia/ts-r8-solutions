import { describe, expect, it } from "vitest";
import { CPU } from "./";

describe("CPU", () => {
  it("initialises CPU", () => {
    const cpu = CPU();

    expect(cpu.pc).toBe(0);
    expect(cpu.memory[0]).toBe(0);
  });

  it("step increments PC", () => {
    const cpu = CPU();

    cpu.memory[0] = 1;

    cpu.step();
    expect(cpu.pc).toBe(1);
  });

  it("step increments PC twice", () => {
    const cpu = CPU();

    cpu.memory[0] = 1;
    cpu.memory[1] = 1;

    cpu.step();
    expect(cpu.pc).toBe(1);

    cpu.step();
    expect(cpu.pc).toBe(2);
  });
});
