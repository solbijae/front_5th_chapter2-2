import { CartItem, Coupon, Product } from "../../../../types";

export const calculateItemTotal = (item: CartItem) => {
  const maxDiscount = item.product.discounts.reduce((max, discount) => {
    return item.quantity >= discount.quantity ? Math.max(max, discount.rate) : max;
  }, 0);
  return item.product.price * item.quantity * (1 - maxDiscount);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  return item.product.discounts.reduce((max, discount) => {
    return item.quantity >= discount.quantity ? Math.max(max, discount.rate) : max;
  }, 0);
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  let totalAfterDiscount = cart.reduce((acc, item) => acc + calculateItemTotal(item), 0);

  if (selectedCoupon) {
    if (selectedCoupon.discountType === "amount") {
      totalAfterDiscount -= selectedCoupon.discountValue;
    } else if (selectedCoupon.discountType === "percentage") {
      totalAfterDiscount *= (1 - selectedCoupon.discountValue / 100);
    }
  }

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  if (newQuantity === 0) {
    return cart.filter((item) => item.product.id !== productId);
  }
  return cart.map((item) => {
    if (item.product.id === productId) {
      const maxQuantity = item.product.stock;
      const updatedQuantity = Math.min(newQuantity, maxQuantity);
      return { ...item, quantity: updatedQuantity };
    }
    return item;
  });
};

// CartPage에서 가져온 함수
export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find(item => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let appliedDiscount = 0;
  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }
  return appliedDiscount;
};