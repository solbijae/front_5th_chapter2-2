import { useState } from "react";
import { Coupon, Discount, Product } from "../../../../types";

export const useCoupons = (
  initialCoupons: Coupon[], 
  onCouponAdd?: (coupon: Coupon) => void,
  products?: Product[],
  editingProduct?: Product | null,
  setEditingProduct?: (product: Product | null) => void,
  onProductUpdate?: (product: Product) => void
) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0
  });
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });

  const handleAddCoupon = (coupon: Coupon) => {
    setCoupons([...coupons, coupon]);
    onCouponAdd?.(coupon);
    setNewCoupon({
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: 0
    });
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products?.find(p => p.id === productId);
    if (updatedProduct && editingProduct && setEditingProduct && onProductUpdate) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount]
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products?.find(p => p.id === productId);
    if (updatedProduct && setEditingProduct && onProductUpdate) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index)
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  return { 
    coupons,
    newCoupon,
    selectedCoupon,
    newDiscount,
    setNewCoupon,
    setNewDiscount,
    handleAddCoupon,
    applyCoupon: (coupon: Coupon) => {
      setSelectedCoupon(coupon);
    },
    handleAddDiscount,
    handleRemoveDiscount
  };
};
