// useCart.ts
import { useState } from "react";
import { CartItem, Product } from "../../../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../utils/cart";
import { useCoupons } from "../../discount/hooks/useCoupon";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { selectedCoupon, applyCoupon } = useCoupons([]);
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingCartItem = prevCart.find((item) => item.product.id === product.id);
      if (existingCartItem) {
        return updateCartItemQuantity(prevCart, product.id, existingCartItem.quantity + 1);
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart => updateCartItemQuantity(prevCart, productId, newQuantity));
  };

  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};

