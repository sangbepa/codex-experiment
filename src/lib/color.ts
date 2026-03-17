export function hexToRgba(hex: string, alpha: number): string {
  const sanitizedHex = hex.replace('#', '');
  const normalizedHex =
    sanitizedHex.length === 3
      ? sanitizedHex
          .split('')
          .map((character) => `${character}${character}`)
          .join('')
      : sanitizedHex;

  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
