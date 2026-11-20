import { filterProducts } from '../src/helpers/catalog';

const products = [
  { name: 'Pink Notebook', category: 'Paper & Planning', price: 180 },
  { name: 'Pink Marker', category: 'Art Supplies', price: 250 },
  { name: 'Blue Pen', category: 'Everyday Essentials', price: 35 },
];

describe('filterProducts', () => {
  test('applies search, category, and price filters together', () => {
    expect(filterProducts(products, 'pink', 'Paper & Planning', 'Rs 150–250'))
      .toEqual([products[0]]);
  });

  test('matches category names and includes both price boundaries', () => {
    expect(filterProducts(products, 'art supplies', 'All Products', 'Rs 150–250'))
      .toEqual([products[1]]);
  });

  test('returns an empty result when the selected category conflicts with search', () => {
    expect(filterProducts(products, 'notebook', 'Art Supplies', 'Any price'))
      .toEqual([]);
  });
});