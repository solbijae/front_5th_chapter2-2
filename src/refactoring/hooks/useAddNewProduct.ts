import { Product } from '../../types';
import { useAtom } from 'jotai';
import { showNewProductFormAtom, newProductAtom } from '../atoms/adminAtoms';

export const useAddNewProduct = (onProductAdd: (product: Product) => void) => {
  const [showNewProductForm, setShowNewProductForm] = useAtom(showNewProductFormAtom);
  const [newProduct, setNewProduct] = useAtom(newProductAtom);

  return {
    showNewProductForm,
    setShowNewProductForm,
    // 새 상품 추가
    handleAddNewProduct: () => {
      const productWithId = { ...newProduct, id: Date.now().toString() };
      onProductAdd(productWithId);
      setNewProduct({
        id: '',
        name: '',
        price: 0,
        stock: 0,
        discounts: []
      });
      setShowNewProductForm(false);
    }
  }
}
