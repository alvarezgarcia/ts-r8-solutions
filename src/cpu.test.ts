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

  it("inc wraps A register from 255 to 0", () => {
    const cpu = CPU();

    cpu.memory[0] = 48;
    cpu.A = 255;

    cpu.step();
    expect(cpu.A).toBe(0);
  });

  it("dec wraps A register from 0 to 255", () => {
    const cpu = CPU();

    cpu.memory[0] = 64;
    cpu.A = 0;

    cpu.step();
    expect(cpu.A).toBe(255);
  });

  it("step wraps PC register from 65535 to 0", () => {
    const cpu = CPU()

    cpu.memory[65535] = 1;
    cpu.PC = 65535;

    cpu.step();
    expect(cpu.PC).toBe(0);
  });

  it("memory is bytes", () => {
    const cpu = CPU();
    let byte = new Uint8Array(1);
    byte[0] = 256; // We exceed the max value of a 1 byte unsigned integer (255) so we have again 0

    cpu.memory[0] = byte[0];
    expect(cpu.memory[0]).toBe(0);
  });
});
