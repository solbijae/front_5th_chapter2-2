import { atom } from "jotai";
import { CartItem, Coupon } from "../../types";

export const cartAtom = atom<CartItem[]>([]);
export const selectedCouponAtom = atom<Coupon | null>(null);
