export const DELIVERY_FEE = 40;
export const FREE_DELIVERY_THRESHOLD = 500;

export function addCartItem(cart, productId) {
  return { ...cart, [productId]: (cart[productId] || 0) + 1 };
}

export function changeCartQuantity(cart, productId, amount) {
  const nextCart = { ...cart };
  const quantity = (nextCart[productId] || 0) + amount;

  if (quantity <= 0) delete nextCart[productId];
  else nextCart[productId] = quantity;
  return nextCart;
}

export function removeCartItem(cart, productId) {
  const nextCart = { ...cart };
  delete nextCart[productId];
  return nextCart;
}

export function getCartItems(cart, products) {
  return Object.entries(cart).flatMap(([productId, quantity]) => {
    const product = products.find((item) => String(item.id) === String(productId));
    if (!product || quantity <= 0) return [];
    return [{ ...product, price: Number(product.price) || 0, quantity: Number(quantity) || 0 }];
  });
}

export function getCartSummary(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  return { subtotal, delivery, total: subtotal + delivery };
}