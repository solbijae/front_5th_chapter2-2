import { useState } from "react";
import { Product } from "../../types.ts";
import { updateProductInList } from '../models/product.ts';

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  
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
