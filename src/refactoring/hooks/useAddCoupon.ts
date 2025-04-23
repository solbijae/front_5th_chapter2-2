import { useState } from 'react';
import { Coupon } from '../../types';

export const useAddCoupon = (onCouponAdd: (coupon: Coupon) => void) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0
  });

  return {
    newCoupon,
    setNewCoupon,

    // 쿠폰 추가 버튼 클릭 시 실행
    handleAddCoupon: () => {
      // 쿠폰 목록에 새로운 쿠폰 추가
      onCouponAdd(newCoupon);
      // 입력 폼을 초기화
      setNewCoupon({
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: 0
      });
    },
  };
};


