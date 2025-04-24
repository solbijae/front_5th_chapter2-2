import { atomWithStorage } from 'jotai/utils';
import { Product, Coupon } from '../../types';
import { initialProducts } from '../constants/product';
import { initialCoupons } from '../constants/coupon';

export const productsAtom = atomWithStorage<Product[]>('products', initialProducts);
export const couponsAtom = atomWithStorage<Coupon[]>('coupons', initialCoupons);