import { Product } from '../../types'

export const updateProductInList = (prevProducts: Product[], updatedProduct: Product) => {
    // 업데이트된 id를 가진 상품을 찾아서 업데이트
    return prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p);
}