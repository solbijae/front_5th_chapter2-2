import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { CartItem, Coupon } from "../../types";

// 테스트 환경에서는 atom을, 실제 환경에서는 atomWithStorage를 사용
const createStorageAtom = <T>(key: string, initialValue: T) => {
  if (import.meta.env.MODE === 'test') {
    return atom<T>(initialValue);
  }
  return atomWithStorage<T>(key, initialValue);
};

export const cartAtom = createStorageAtom<CartItem[]>('cart', []);
export const selectedCouponAtom = createStorageAtom<Coupon | null>('selectedCoupon', null);
