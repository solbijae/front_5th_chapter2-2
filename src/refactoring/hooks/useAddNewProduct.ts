import { useState } from 'react';
import { Product } from '../../types';

export const useAddNewProduct = (onProductAdd: (product: Product) => void) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    discounts: []
  });

  return {
    showNewProductForm,
    setShowNewProductForm,
    newProduct,
    setNewProduct,

    // 새 상품 추가
    handleAddNewProduct: () => {
      const productWithId = { ...newProduct, id: Date.now().toString() };
      onProductAdd(productWithId);
      setNewProduct({
        name: '',
        price: 0,
        stock: 0,
        discounts: []
      });
      setShowNewProductForm(false);
    }
  }
}
