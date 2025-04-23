import { useAtom } from 'jotai';
import { editProductAtom, newDiscountAtom } from '../atoms/adminAtoms';
import { Product } from '../../types';

export const useEditProduct = (products: Product[], onProductUpdate: (product: Product) => void) => {
  const [editingProduct, setEditingProduct] = useAtom(editProductAtom);
  const [newDiscount, setNewDiscount] = useAtom(newDiscountAtom);

  return {
    // 수정하려는 상품의 정보를 복사해서 새로운 객체 생성 (editingProduct 상태에 저장)
    handleEditProduct: (product: Product) => {
      setEditingProduct({...product});
    },

    // 상품명 수정
    handleProductNameUpdate: (productId: string, newName: string) => {
      if (editingProduct && editingProduct.id === productId) {
        const updatedProduct = { ...editingProduct, name: newName };
        setEditingProduct(updatedProduct);
      }
    },

    // 상품 가격 수정
    handlePriceUpdate: (productId: string, newPrice: number) => {
      if (editingProduct && editingProduct.id === productId) {
        const updatedProduct = { ...editingProduct, price: newPrice };
        setEditingProduct(updatedProduct);
      }
    },

    // 상품 수정 완료
    handleEditComplete: () => {
      if (editingProduct) {
        onProductUpdate(editingProduct);
        setEditingProduct(null);
      }
    },

    // 상품 재고 수정
    handleStockUpdate: (productId: string, newStock: number) => {
      const updatedProduct = products.find(p => p.id === productId);
      if (updatedProduct) {
        const newProduct = { ...updatedProduct, stock: newStock };
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
      }
    },

    // 상품 할인 추가
    handleAddDiscount: (productId: string) => {
      const updatedProduct = products.find(p => p.id === productId);
      if (updatedProduct && editingProduct && newDiscount) {
        const newProduct = {
          ...updatedProduct,
          discounts: [...updatedProduct.discounts, newDiscount]
        };
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
        setNewDiscount({ quantity: 0, rate: 0 });
      }
    },

    // 상품 할인 제거
    handleRemoveDiscount: (productId: string, index: number) => {
      const updatedProduct = products.find(p => p.id === productId);
      if (updatedProduct) {
        const newProduct = {
          ...updatedProduct,
          discounts: updatedProduct.discounts.filter((_, i) => i !== index)
        };
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
      }
    },
  }
}
