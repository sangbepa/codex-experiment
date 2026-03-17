import { describe, expect, it } from 'vitest';
import { hexToRgba } from '../../src/lib/color';

describe('color', () => {
  it('converts shorthand hex colors to rgba', () => {
    expect(hexToRgba('#abc', 0.5)).toBe('rgba(170, 187, 204, 0.5)');
  });

  it('converts six-digit hex colors to rgba', () => {
    expect(hexToRgba('#16A34A', 0.12)).toBe('rgba(22, 163, 74, 0.12)');
  });
});
