import { useState } from "react";
import { Product } from "../../../../types";

export const useProducts = (initialProducts: Product[], onProductAdd?: (product: Product) => void) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    discounts: []
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  
  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd?.(productWithId);
    setNewProduct({
      name: '',
      price: 0,
      stock: 0,
      discounts: []
    });
    setShowNewProductForm(false);
  };

  return {
    products,
    newProduct,
    showNewProductForm,
    setNewProduct,
    setShowNewProductForm,
    handleAddNewProduct,
    updateProduct: (updatedProduct: Product) => {
      setProducts(prevProducts => 
        prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      );
    },
    addProduct: (newProduct: Product) => {
      setProducts([...products, newProduct]);
    }
  };
};
