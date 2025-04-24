import { getAppliedDiscount } from "../../models/cart"
import { Coupon } from '../../../types';
import { useAtom } from "jotai";
import { cartAtom } from "../../atoms/cartAtoms";
import { useCart } from "../../hooks/useCart";
import { AddedItems } from "./AddedItems";
import { ApplyCoupon } from "./ApplyCoupon";
import { OrderSummary } from "./OrderSummary";
interface Props {
  coupons: Coupon[];
}

export const CartList = ({ coupons }: Props) => {
  const [cart] = useAtom(cartAtom);
  const { removeFromCart, updateQuantity, applyCoupon, calculateTotal, selectedCoupon } = useCart();
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <AddedItems
        cart={cart}
        getAppliedDiscount={getAppliedDiscount}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />

      <ApplyCoupon
        coupons={coupons}
        applyCoupon={applyCoupon}
        selectedCoupon={selectedCoupon}
      />

      <OrderSummary
        totalBeforeDiscount={totalBeforeDiscount}
        totalAfterDiscount={totalAfterDiscount}
        totalDiscount={totalDiscount}
      />
    </div>
  )
}