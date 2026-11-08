export const readWordLE = (lowByte: number, highByte: number) =>
  (highByte << 8) | lowByte;
