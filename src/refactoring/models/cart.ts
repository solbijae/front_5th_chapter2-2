import { CartItem, Coupon, Product } from "../../types";

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
  // newQuantity가 0이면 해당 상품을 장바구니에서 제거
  if (newQuantity === 0) {
    return cart.filter((item) => item.product.id !== productId);
  }

  // 요청된 수량과 최대 재고량 중 작은 수량으로 업데이트
  return cart.map((item) => {
    if (item.product.id === productId) {
      const maxQuantity = item.product.stock;
      const updatedQuantity = Math.min(newQuantity, maxQuantity);
      return { ...item, quantity: updatedQuantity };
    }
    return item;
  });
};

// addToCart 순수함수 분리
export const getItemAddedCart = (prevCart: CartItem[], product: Product) => {
  const existingCartItem = prevCart.find((item) => item.product.id === product.id);
  if (existingCartItem) {
    return updateCartItemQuantity(prevCart, product.id, existingCartItem.quantity + 1);
  } else {
    return [...prevCart, { product, quantity: 1 }];
  }
}

// removeFromCart 순수함수 분리
export const getItemRemovedCart = (prevCart: CartItem[], productId: string) => {
  return prevCart.filter((item) => item.product.id !== productId);
}
