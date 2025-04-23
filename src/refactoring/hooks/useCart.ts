// src/refactoring/hooks/useCart.ts
import { useAtom } from "jotai";
import { Coupon, Product } from "../../types";
import { calculateCartTotal, getItemAddedCart, getItemRemovedCart, updateCartItemQuantity } from "../models/cart";
import { cartAtom, selectedCouponAtom } from "../atoms/cartAtoms";

export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [selectedCoupon, setSelectedCoupon] = useAtom(selectedCouponAtom);

  const addToCart = (product: Product) => {
    setCart(prevCart => getItemAddedCart(prevCart, product));
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => getItemRemovedCart(prevCart, productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart => updateCartItemQuantity(prevCart, productId, newQuantity));
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

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