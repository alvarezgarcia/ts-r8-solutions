import { describe, expect, it } from "vitest";
import { CPU, OpCodes } from "./";

describe("CPU", () => {
  it("initialises CPU", () => {
    const cpu = CPU();

    expect(cpu.pc).toBe(0);
    expect(cpu.A).toBe(0);
    expect(cpu.memory[0]).toBe(0);
  });

  it("step increments PC", () => {
    const cpu = CPU();

    cpu.memory[0] = OpCodes.NOP;

    cpu.step();
    expect(cpu.pc).toBe(1);
  });

  it("step increments PC twice", () => {
    const cpu = CPU();

    cpu.memory[0] = OpCodes.NOP;
    cpu.memory[1] = OpCodes.NOP;

    cpu.step();
    expect(cpu.pc).toBe(1);

    cpu.step();
    expect(cpu.pc).toBe(2);
  });

  it("runs until halted", () => {
    const cpu = CPU();

    cpu.memory[0] = OpCodes.NOP;
    cpu.memory[1] = OpCodes.HALT;

    cpu.run();
    expect(cpu.pc).toBe(2);
  });

  it("inc increments A register", () => {
    const cpu = CPU();

    cpu.memory[0] = OpCodes.INC;
    cpu.memory[1] = OpCodes.HALT;

    cpu.run();
    expect(cpu.A).toBe(1);
  });
});
