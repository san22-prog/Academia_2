import {
  addCartItem,
  changeCartQuantity,
  getCartItems,
  getCartSummary,
  removeCartItem,
} from '../src/helpers/cart';

const products = [
  { id: 'P001', name: 'Notebook', price: 180 },
  { id: 'P002', name: 'Pen', price: 35 },
];

describe('cart operations', () => {
  test('increments, updates, and removes quantities without mutating input', () => {
    const initialCart = { P001: 1 };
    const increasedCart = addCartItem(initialCart, 'P001');
    expect(increasedCart).toEqual({ P001: 2 });
    expect(changeCartQuantity(increasedCart, 'P001', -1)).toEqual({ P001: 1 });
    expect(changeCartQuantity({ P001: 1 }, 'P001', -1)).toEqual({});
    expect(removeCartItem(increasedCart, 'P001')).toEqual({});
    expect(initialCart).toEqual({ P001: 1 });
  });

  test('builds item totals and applies the free-delivery threshold', () => {
    const items = getCartItems({ P001: 2, P002: 1, missing: 1 }, products);
    expect(items).toHaveLength(2);
    expect(getCartSummary(items)).toEqual({ subtotal: 395, delivery: 40, total: 435 });
    expect(getCartSummary([{ price: 250, quantity: 2 }])).toEqual({
      subtotal: 500,
      delivery: 0,
      total: 500,
    });
    expect(getCartSummary([])).toEqual({ subtotal: 0, delivery: 0, total: 0 });
  });
});