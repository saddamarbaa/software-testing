const { default: axios } = require('axios');

const db = require('../../src/modal/db');

jest.mock('axios');

const {
  sum,
  greeting,
  isEven,
  getShoppingList,
  getOrderById,
  getOrders,
  applyDiscount,
  fetchData,
} = require('../../src/utils/index');

describe('Test Health check', () => {
  test('it should check the testing setup and test success', () => {
    expect('Saddam').toBe('Saddam');
  });
});

// Testing numbers
describe('Sum', () => {
  test('it adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).toBeGreaterThan(2);
  });

  test('it adds 1 + 2 to equal 4', () => {
    const value = sum(2, 2);
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

  // Testing floating number
  it('adds floating point numbers 0.1, 0.2 toBeCloseTo(0.3)', () => {
    const value = sum(0.1, 0.2);
    expect(value).toBeLessThan(2);
    expect(value).toBeGreaterThan(0.2);
    //This won't work because of rounding error
    // expect(value).toBe(0.3);
    expect(value).toBeCloseTo(0.3); // This works.
  });
});

// Testing strings
describe('Greeting', () => {
  it('Should return Hello Saddam', () => {
    expect(greeting('Saddam')).not.toMatch(/Hello Jesi/);
    expect(greeting('Saddam')).toMatch(/Hello Saddam/);
    expect(greeting('am')).toMatch(/Hello am/);
    expect(greeting('Saddam')).toBe('Hello Saddam!');
    expect(greeting('Saddam')).toMatch(/^Hello Saddam!$/); // exact match
  });
});

// Testing truthiness
describe('IsEven', () => {
  it('Should return tru for 4', () => {
    const result = isEven(4);
    expect(result).toBeTruthy();
    expect(result).not.toBeFalsy();
  });

  it('Should return false for 5', () => {
    const result = isEven(5);
    expect(result).toBeFalsy();
    expect(result).not.toBeTruthy();
  });
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

// Testing arrays and iterables
describe('ShoppingList', () => {
  const shoppingList = getShoppingList();
  it('It has milk on it', () => {
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk');
  });

  it('It not has book on it', () => {
    expect(new Set(shoppingList)).not.toContain('book');
  });

  it('It has trash bags on it', () => {
    expect(new Set(shoppingList)).toContain('trash bags');
  });
});

// Testing Object and Throw error
describe('getOrderById', () => {
  it('Should return order of  id 10', () => {
    expect(getOrderById(10)).toStrictEqual({ id: 10, price: 10, name: 'Book' });
  });

  it('Should return order of  id 3', () => {
    expect(getOrderById(3)).toEqual({ id: 3, price: 10, name: 'Book' });
  });

  it('Should return order of  id 11', () => {
    expect(getOrderById(11)).toMatchObject({ id: 11, price: 10 });
  });

  it('Should return order of id 12', () => {
    expect(getOrderById(12)).toHaveProperty('price', 10);
  });

  it('Should throws error if id is not defined', () => {
    expect(() => {
      return getOrderById();
    }).toThrow();
  });

  it('Should throws error if id is not defined with message "id is not defined with message"', () => {
    expect(() => {
      return getOrderById();
    }).toThrow('id is not defined');
  });
});

// Testing Asynchronous Code
describe('getOrders', () => {
  it('Should return some orders', async () => {
    const orders = await getOrders();
    expect(orders.length).toBeGreaterThan(0);
  });

  it('Should fails with an error', async () => {
    try {
      await getOrders();
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  it('Should return some orders on resolve', async () => {
    await expect(getOrders()).resolves.toContainEqual({
      id: 81,
      price: 181,
    });
  });

  // it('Should throw error on reject', async () => {
  //   await expect(getOrders()).reject.toMatch('error');
  // });
});

// Mock Functions with pure javascript (not recommended)
describe('applyDiscount', () => {
  // Mock the getOrder function
  // this abroach over write the ordinal function on all files
  db.getOrder = function () {
    return {
      id: 10,
      price: 100,
    };
  };

  test('it should apply discount 10% for order with price 10', () => {
    const order = applyDiscount(10);
    expect(order).toEqual({
      id: 10,
      price: 10,
    });
  });
});

// Mock Functions with jest (recommended)
describe('applyDiscount', () => {
  const mockFn = jest
    .fn()
    .mockReturnValue('default')
    .mockReturnValueOnce('first call')
    .mockReturnValueOnce('second call');

  console.log(mockFn()); // 'first call'
  console.log(mockFn()); // 'second call'
  console.log(mockFn()); // 'default'
  console.log(mockFn()); // 'default'

  db.getOrder = jest
    .fn()
    .mockReturnValue({
      id: 10,
      price: 100,
    })
    .mockReturnValueOnce({
      id: 10,
      price: 100,
    });

  const order = applyDiscount(10);
  expect(order).toEqual({
    id: 10,
    price: 10,
  });
  expect(db.getOrder.mock.calls[0][0]).toBe(10);

  console.log(db.getOrder.mock.calls[0][0]);
  // Rest the mocked function to it ordinal code
  // db.getOrder.mockReset();
});

// Functions mock implementation
describe('applyDiscount', () => {
  db.getOrder = jest.fn().mockImplementation((id) => {
    if (id < 5) {
      return { id: id, price: 10 * 0.1 };
    }
    return { id: id, price: 100 };
  });

  const order = applyDiscount(10);
  expect(order).toEqual({
    id: 10,
    price: 10,
  });
  expect(db.getOrder.mock.calls[0][0]).toBe(10);

  // Rest the mocked function to it ordinal code
  // db.getOrder.mockReset();
});

// Mocking Modules
describe('fetchData', () => {
  test('should fetch users', async () => {
    const resp = [{ id: 5 }];

    axios.get.mockImplementation(() => Promise.resolve(resp));

    const data = await fetchData();

    return expect(data).toEqual(resp);
  });
});
