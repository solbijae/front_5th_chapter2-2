import { useMemo } from "react";
import { Coupon } from "../../types.ts";
import { couponsAtom } from "../atoms/appAtoms.ts";
import { atom } from "jotai";
import { useAtom } from "jotai";

export const useCoupons = (initialCoupons: Coupon[]) => {
  // 테스트 환경에서는 atom을, 실제 환경에서는 atomWithStorage를 사용
  const atomToUse = useMemo(
    () => (import.meta.env.MODE === 'test' && initialCoupons ? atom(initialCoupons) : couponsAtom),
    [initialCoupons]
  );
  const [coupons, setCoupons] = useAtom(atomToUse);
  
  return { 
    coupons,
    
    // 쿠폰 목록에 새로운 쿠폰 추가
    addCoupon: (newCoupon: Coupon) => {
      setCoupons([...coupons, newCoupon]);
    } 
  };
};
