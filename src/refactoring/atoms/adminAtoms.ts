import { atom } from 'jotai';
import { Product, Coupon } from '../../types';
import { Discount } from '../../types';

export const editProductAtom = atom<Product | null>(null);
export const newDiscountAtom = atom<Discount>({ quantity: 0, rate: 0 });

export const newCouponAtom = atom<Coupon>({
  name: '',
  code: '',
  discountType: 'percentage',
  discountValue: 0
});

export const openProductIdsAtom = atom<string[]>([]);

export const showNewProductFormAtom = atom<boolean>(false);
export const newProductAtom = atom<Product>({
  id: '',
  name: '',
  price: 0,
  stock: 0,
  discounts: []
});
