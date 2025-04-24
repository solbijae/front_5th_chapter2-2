import { getMaxDiscount, getRemainingStock } from '../../models/cart';
import { Product } from "../../../types"
import { useAtom } from 'jotai';
import { cartAtom } from '../../atoms/cartAtoms';
import { useCart } from '../../hooks/useCart';
import { ProductCard } from './ProductCard';

export const ProductList = (
  {
    products,
  }: {
    products: Product[],
  }
) => {
  const [cart] = useAtom(cartAtom);
  const { addToCart } = useCart();
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map(product => {
          const remainingStock = getRemainingStock(product, cart);
          const maxDiscount = (getMaxDiscount(product.discounts) * 100).toFixed(0)
          return (
            <ProductCard 
              product={product}
              remainingStock={remainingStock}
              maxDiscount={maxDiscount}
              onAddToCart={() => addToCart(product)}
            />
          );
        })}
      </div>
    </div>
  )
}