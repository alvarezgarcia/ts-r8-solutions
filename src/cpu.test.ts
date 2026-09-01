import { describe, expect, it } from "vitest";
import { CreateCPU } from "./cpu";

describe("CPU", () => {
  it("initialises CPU", () => {
    const cpu = CreateCPU();

    expect(cpu.PC).toBe(0);
    expect(cpu.memory[0]).toBe(0);
  });

  it("step increments PC", () => {
    const cpu = CreateCPU();

    cpu.step();
    expect(cpu.PC).toBe(1);

    cpu.step();
    expect(cpu.PC).toBe(2);
  });
});
