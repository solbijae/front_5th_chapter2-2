import { useAtom } from 'jotai';
import { editProductAtom, newDiscountAtom, newProductAtom } from '../../atoms/adminAtoms';
import { useEditProduct } from '../../hooks/useEditProduct';
import { useToggleProduct } from '../../hooks/useToggleProduct';
import { useAddNewProduct } from '../../hooks/useAddNewProduct';
import { Product } from '../../../types';
import { AddProduct } from './AddProduct';
import { AdminProductList } from './AdminProductList';
interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export const ProductManagement = ({ products, onProductUpdate, onProductAdd }: Props) => {
  const [editingProduct] = useAtom(editProductAtom);
  const [newDiscount, setNewDiscount] = useAtom(newDiscountAtom);
  const [newProduct, setNewProduct] = useAtom(newProductAtom);

  const { handleEditProduct, handleProductNameUpdate, handlePriceUpdate, handleStockUpdate, handleEditComplete, handleAddDiscount, handleRemoveDiscount } = useEditProduct(products, onProductUpdate);
  const { openProductIds, toggleProductAccordion } = useToggleProduct();
  const { showNewProductForm, setShowNewProductForm, handleAddNewProduct } = useAddNewProduct(onProductAdd);

  const handleChange = (field: "name" | "price" | "stock", value: string | number) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? '취소' : '새 상품 추가'}
      </button>
      {showNewProductForm && (
        <AddProduct
          newProduct={newProduct}
          handleAddNewProduct={handleAddNewProduct}
          handleChange={handleChange}
        />
      )}

      <AdminProductList 
        products={products}
        openProductIds={openProductIds}
        toggleProductAccordion={toggleProductAccordion}
        editingProduct={editingProduct}
        handleEditProduct={handleEditProduct}
        handleProductNameUpdate={handleProductNameUpdate}
        handlePriceUpdate={handlePriceUpdate}
        handleStockUpdate={handleStockUpdate}
        handleEditComplete={handleEditComplete}
        handleAddDiscount={handleAddDiscount}
        handleRemoveDiscount={handleRemoveDiscount}
        newDiscount={newDiscount}
        setNewDiscount={setNewDiscount}
      />
    </div>
  );
};