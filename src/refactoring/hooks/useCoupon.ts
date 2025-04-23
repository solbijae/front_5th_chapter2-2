import { useState } from "react";
import { Coupon } from "../../types.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  return { 
    coupons,
    
    // 쿠폰 목록에 새로운 쿠폰 추가
    addCoupon: (newCoupon: Coupon) => {
      setCoupons([...coupons, newCoupon]);
    } 
  };
};
