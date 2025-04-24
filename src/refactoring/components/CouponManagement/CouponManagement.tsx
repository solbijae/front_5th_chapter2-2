import { useAtom } from 'jotai';
import { newCouponAtom } from '../../atoms/adminAtoms';
import { useAddCoupon } from '../../hooks/useAddCoupon';
import { Coupon } from '../../../types';
import { AddCoupon } from './AddCoupon';
import { CouponList } from './CouponList';
interface Props {
  coupons: Coupon[];
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const CouponManagement = ({ coupons, onCouponAdd }: Props) => {
  const [newCoupon, setNewCoupon] = useAtom(newCouponAtom);
  const { handleAddCoupon } = useAddCoupon(onCouponAdd);

  const handleChange = (field: "name" | "code" | "discountType" | "discountValue", value: string | number) => {
    setNewCoupon({ ...newCoupon, [field]: value });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <AddCoupon 
          newCoupon={newCoupon}
          handleAddCoupon={handleAddCoupon}
          handleChange={handleChange}
        />

        <CouponList 
          coupons={coupons} 
        />
      </div>
    </div>
  )
}