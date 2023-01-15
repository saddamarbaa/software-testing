const { sum, greeting, isEven } = require('../../src/utils/index');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(1, 2)).toBeGreaterThan(2);
});

test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

// Testing floating number
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  expect(value).toBeLessThan(2);
  expect(value).toBeGreaterThan(0.2);
  //This won't work because of rounding error
  // expect(value).toBe(0.3);
  expect(value).toBeCloseTo(0.3); // This works.
});

// Testing Strings
test('greeting it should return Hello Saddam', () => {
  expect(greeting('Saddam')).not.toMatch(/Hello Jesi/);
  expect(greeting('Saddam')).toMatch(/Hello Saddam/);
  expect(greeting('am')).toMatch(/Hello am/);
  expect(greeting('Saddam')).toBe('Hello Saddam!');
  expect(greeting('Saddam')).toMatch(/^Hello Saddam!$/); // exact match
});

// Testing Truthiness
test('isEven Should return tru for 4', () => {
  const result = isEven(4);
  expect(result).toBeTruthy();
  expect(result).not.toBeFalsy();
});

test('isEven Should return false for 5', () => {
  const result = isEven(5);
  expect(result).toBeFalsy();
  expect(result).not.toBeTruthy();
});

describe('Validation', () => {
  test('it Should return null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  test('it Should return zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });
});
