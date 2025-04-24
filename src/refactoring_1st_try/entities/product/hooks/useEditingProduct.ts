import { Product } from "../../../../types";
import { Dispatch, SetStateAction } from "react";

export const useEditingProduct = (
  editingProduct: Product | null,
  setEditingProduct: Dispatch<SetStateAction<Product | null>>,
  setOpenProductIds: Dispatch<SetStateAction<Set<string>>>,
  onProductUpdate: (product: Product) => void
) => {
  const handleEditProduct = (product: Product) => {
    setEditingProduct({...product});
    setOpenProductIds(prev => {
      const newSet = new Set(prev);
      newSet.add(product.id);
      return newSet;
    });
  };

  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, stock: newStock };
      setEditingProduct(updatedProduct);
      onProductUpdate(updatedProduct);
    }
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  return {
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleEditComplete,
    handleStockUpdate
  };
};