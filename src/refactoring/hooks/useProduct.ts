import { Product } from "../../types.ts";
import { updateProductInList } from '../models/product.ts';
import { useMemo } from "react";
import { productsAtom } from '../atoms/appAtoms.ts';
import { atom } from "jotai";
import { useAtom } from "jotai";

export const useProducts = (initialProducts: Product[]) => {
  // 테스트 환경에서는 atom을, 실제 환경에서는 atomWithStorage를 사용
  const atomToUse = useMemo(
    () => (import.meta.env.MODE === 'test' && initialProducts ? atom(initialProducts) : productsAtom),
    [initialProducts]
  );
  const [products, setProducts] = useAtom(atomToUse);

  return {
    products,
    updateProduct: (updatedProduct: Product) => {
      setProducts(prevProducts => updateProductInList(prevProducts, updatedProduct));
    },
    addProduct: (newProduct: Product) => {
      setProducts([...products, newProduct]);
    },
  };
};
