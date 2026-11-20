export const CATEGORIES = [
  'All Products',
  'Paper & Planning',
  'Everyday Essentials',
  'Art Supplies',
];

export const PRICE_RANGES = [
  'Any price',
  'Under Rs 150',
  'Rs 150–250',
  'Over Rs 250',
];

export function filterProducts(products, search, category, priceRange) {
  const query = search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch = !query
      || `${product.name} ${product.category}`.toLowerCase().includes(query);
    const matchesCategory = category === 'All Products' || product.category === category;
    const matchesPrice = priceRange === 'Any price'
      || (priceRange === 'Under Rs 150' && product.price < 150)
      || (priceRange === 'Rs 150–250' && product.price >= 150 && product.price <= 250)
      || (priceRange === 'Over Rs 250' && product.price > 250);

    return matchesSearch && matchesCategory && matchesPrice;
  });
}