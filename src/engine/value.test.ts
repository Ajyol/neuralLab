import { test, expect } from 'vitest';
import { Value } from './value';

test('mul computes the product', () => {
  const a = new Value(2);
  const b = new Value(-3);
  expect(a.mul(b).data).toBe(-6);
});

test('add computes the sum', () => {
    const a = new Value(9);
    const b = new Value(1);
    expect(a.add(b).data).toBe(10);
});