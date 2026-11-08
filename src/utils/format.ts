export const padNumber = (value: number, offset: number, padNumber = '0') =>
  `0x${value.toString(16).toUpperCase().padStart(offset, padNumber)}`;
