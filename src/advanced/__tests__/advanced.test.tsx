import { Provider } from "jotai";
import { useState } from "react";
import { describe, expect, test } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { CartPage } from '../../refactoring/pages/CartPage';
import { AdminPage } from "../../refactoring/pages/AdminPage";
import { CartItem, Coupon, Product } from '../../types';
import { calculateItemTotal, getMaxApplicableDiscount, calculateCartTotal, updateCartItemQuantity, getItemAddedCart, getItemRemovedCart, getMaxDiscount, getRemainingStock, getAppliedDiscount } from '../../refactoring/models/cart';
import { updateProductInList } from '../../refactoring/models/product';
import { useCart } from '../../refactoring/hooks/useCart';
import { useCoupons } from '../../refactoring/hooks/useCoupon';
import { useProducts } from '../../refactoring/hooks/useProduct';

const mockProducts: Product[] = [
  {
    id: 'p1',
    name: '상품1',
    price: 10000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.1 }]
  },
  {
    id: 'p2',
    name: '상품2',
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }]
  },
  {
    id: 'p3',
    name: '상품3',
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }]
  }
];
const mockCoupons: Coupon[] = [
  {
    name: '5000원 할인 쿠폰',
    code: 'AMOUNT5000',
    discountType: 'amount',
    discountValue: 5000
  },
  {
    name: '10% 할인 쿠폰',
    code: 'PERCENT10',
    discountType: 'percentage',
    discountValue: 10
  }
];

const TestAdminPage = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);


  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  const handleProductAdd = (newProduct: Product) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const handleCouponAdd = (newCoupon: Coupon) => {
    setCoupons(prevCoupons => [...prevCoupons, newCoupon]);
  };

  return (
    <AdminPage
      products={products}
      coupons={coupons}
      onProductUpdate={handleProductUpdate}
      onProductAdd={handleProductAdd}
      onCouponAdd={handleCouponAdd}
    />
  );
};

describe('advanced > ', () => {

  describe('시나리오 테스트 > ', () => {

    test('장바구니 페이지 테스트 > ', async () => {

      render(
        <Provider>
          <CartPage products={mockProducts} coupons={mockCoupons} />
        </Provider>
      );
      const product1 = screen.getByTestId('product-p1');
      const product2 = screen.getByTestId('product-p2');
      const product3 = screen.getByTestId('product-p3');
      const addToCartButtonsAtProduct1 = within(product1).getByText('장바구니에 추가');
      const addToCartButtonsAtProduct2 = within(product2).getByText('장바구니에 추가');
      const addToCartButtonsAtProduct3 = within(product3).getByText('장바구니에 추가');

      // 1. 상품 정보 표시
      expect(product1).toHaveTextContent('상품1');
      expect(product1).toHaveTextContent('10,000원');
      expect(product1).toHaveTextContent('재고: 20개');
      expect(product2).toHaveTextContent('상품2');
      expect(product2).toHaveTextContent('20,000원');
      expect(product2).toHaveTextContent('재고: 20개');
      expect(product3).toHaveTextContent('상품3');
      expect(product3).toHaveTextContent('30,000원');
      expect(product3).toHaveTextContent('재고: 20개');


      // 2. 할인 정보 표시
      expect(screen.getByText('10개 이상: 10% 할인')).toBeInTheDocument();

      // 3. 상품1 장바구니에 상품 추가
      fireEvent.click(addToCartButtonsAtProduct1); // 상품1 추가

      // 4. 할인율 계산
      expect(screen.getByText('상품 금액: 10,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 0원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 10,000원')).toBeInTheDocument();

      // 5. 상품 품절 상태로 만들기
      for (let i = 0; i < 19; i++) {
        fireEvent.click(addToCartButtonsAtProduct1);
      }

      // 6. 품절일 때 상품 추가 안 되는지 확인하기
      expect(product1).toHaveTextContent('재고: 0개');
      fireEvent.click(addToCartButtonsAtProduct1);
      expect(product1).toHaveTextContent('재고: 0개');

      // 7. 할인율 계산
      expect(screen.getByText('상품 금액: 200,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 20,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 180,000원')).toBeInTheDocument();

      // 8. 상품을 각각 10개씩 추가하기
      fireEvent.click(addToCartButtonsAtProduct2); // 상품2 추가
      fireEvent.click(addToCartButtonsAtProduct3); // 상품3 추가

      const increaseButtons = screen.getAllByText('+');
      for (let i = 0; i < 9; i++) {
        fireEvent.click(increaseButtons[1]); // 상품2
        fireEvent.click(increaseButtons[2]); // 상품3
      }

      // 9. 할인율 계산
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 110,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 590,000원')).toBeInTheDocument();

      // 10. 쿠폰 적용하기
      const couponSelect = screen.getByRole('combobox');
      fireEvent.change(couponSelect, { target: { value: '1' } }); // 10% 할인 쿠폰 선택

      // 11. 할인율 계산
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 169,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 531,000원')).toBeInTheDocument();

      // 12. 다른 할인 쿠폰 적용하기
      fireEvent.change(couponSelect, { target: { value: '0' } }); // 5000원 할인 쿠폰
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 115,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 585,000원')).toBeInTheDocument();
    });

    test('관리자 페이지 테스트 > ', async () => {
      render(<TestAdminPage/>);


      const $product1 = screen.getByTestId('product-1');

      // 1. 새로운 상품 추가
      fireEvent.click(screen.getByText('새 상품 추가'));

      fireEvent.change(screen.getByLabelText('상품명'), { target: { value: '상품4' } });
      fireEvent.change(screen.getByLabelText('가격'), { target: { value: '15000' } });
      fireEvent.change(screen.getByLabelText('재고'), { target: { value: '30' } });

      fireEvent.click(screen.getByText('추가'));

      const $product4 = screen.getByTestId('product-4');

      expect($product4).toHaveTextContent('상품4');
      expect($product4).toHaveTextContent('15000원');
      expect($product4).toHaveTextContent('재고: 30');

      // 2. 상품 선택 및 수정
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('toggle-button'));
      fireEvent.click(within($product1).getByTestId('modify-button'));


      act(() => {
        fireEvent.change(within($product1).getByDisplayValue('20'), { target: { value: '25' } });
        fireEvent.change(within($product1).getByDisplayValue('10000'), { target: { value: '12000' } });
        fireEvent.change(within($product1).getByDisplayValue('상품1'), { target: { value: '수정된 상품1' } });
      })

      fireEvent.click(within($product1).getByText('수정 완료'));

      expect($product1).toHaveTextContent('수정된 상품1');
      expect($product1).toHaveTextContent('12000원');
      expect($product1).toHaveTextContent('재고: 25');

      // 3. 상품 할인율 추가 및 삭제
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('modify-button'));

      // 할인 추가
      act(() => {
        fireEvent.change(screen.getByPlaceholderText('수량'), { target: { value: '5' } });
        fireEvent.change(screen.getByPlaceholderText('할인율 (%)'), { target: { value: '5' } });
      })
      fireEvent.click(screen.getByText('할인 추가'));

      expect(screen.queryByText('5개 이상 구매 시 5% 할인')).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText('삭제')[0]);
      expect(screen.queryByText('10개 이상 구매 시 10% 할인')).not.toBeInTheDocument();
      expect(screen.queryByText('5개 이상 구매 시 5% 할인')).toBeInTheDocument();

      fireEvent.click(screen.getAllByText('삭제')[0]);
      expect(screen.queryByText('10개 이상 구매 시 10% 할인')).not.toBeInTheDocument();
      expect(screen.queryByText('5개 이상 구매 시 5% 할인')).not.toBeInTheDocument();

      // 4. 쿠폰 추가
      fireEvent.change(screen.getByPlaceholderText('쿠폰 이름'), { target: { value: '새 쿠폰' } });
      fireEvent.change(screen.getByPlaceholderText('쿠폰 코드'), { target: { value: 'NEW10' } });
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'percentage' } });
      fireEvent.change(screen.getByPlaceholderText('할인 값'), { target: { value: '10' } });

      fireEvent.click(screen.getByText('쿠폰 추가'));

      const $newCoupon = screen.getByTestId('coupon-3');

      expect($newCoupon).toHaveTextContent('새 쿠폰 (NEW10):10% 할인');
    })
  })

  // 추가된 테스트 코드
  describe('순수 함수 테스트 (models 폴더) > ', () => {
    const mockProduct: Product = {
      id: 'p1',
      name: '상품1',
      price: 10000,
      stock: 20,
      discounts: [{ quantity: 10, rate: 0.1 }]
    };

    const mockCartItem: CartItem = {
      product: mockProduct,
      quantity: 15
    };

    const mockCart: CartItem[] = [mockCartItem];

    test('calculateItemTotal 테스트', () => {
      // 할인율 10%가 적용되어야 함 (15개 >= 10개)
      expect(calculateItemTotal(mockCartItem)).toBe(135000); // 10000 * 15 * 0.9
    });

    test('getMaxApplicableDiscount 테스트', () => {
      expect(getMaxApplicableDiscount(mockCartItem)).toBe(0.1);
    });

    test('calculateCartTotal 테스트', () => {
      const mockCoupon: Coupon = {
        name: '10% 할인 쿠폰',
        code: 'PERCENT10',
        discountType: 'percentage',
        discountValue: 10
      };

      // 쿠폰 없을 때
      const resultWithoutCoupon = calculateCartTotal(mockCart, null);
      expect(resultWithoutCoupon.totalBeforeDiscount).toBe(150000);
      expect(resultWithoutCoupon.totalAfterDiscount).toBe(135000);
      expect(resultWithoutCoupon.totalDiscount).toBe(15000);

      // 쿠폰 있을 때
      const resultWithCoupon = calculateCartTotal(mockCart, mockCoupon);
      expect(resultWithCoupon.totalBeforeDiscount).toBe(150000);
      expect(resultWithCoupon.totalAfterDiscount).toBe(121500); // 135000 * 0.9
      expect(resultWithCoupon.totalDiscount).toBe(28500);
    });

    test('updateCartItemQuantity 테스트', () => {
      // 수량 업데이트
      const updatedCart = updateCartItemQuantity(mockCart, 'p1', 5);
      expect(updatedCart[0].quantity).toBe(5);

      // 수량 0으로 업데이트 (삭제)
      const emptyCart = updateCartItemQuantity(mockCart, 'p1', 0);
      expect(emptyCart.length).toBe(0);

      // 최대 재고량 초과
      const maxStockCart = updateCartItemQuantity(mockCart, 'p1', 25);
      expect(maxStockCart[0].quantity).toBe(20);
    });

    test('getItemAddedCart 테스트', () => {
      // 새로운 상품 추가
      const newProduct: Product = {
        id: 'p2',
        name: '상품2',
        price: 20000,
        stock: 10,
        discounts: []
      };
      const cartWithNewItem = getItemAddedCart(mockCart, newProduct);
      expect(cartWithNewItem.length).toBe(2);
      expect(cartWithNewItem[1].quantity).toBe(1);

      // 기존 상품 수량 증가
      const cartWithIncreasedQuantity = getItemAddedCart(mockCart, mockProduct);
      expect(cartWithIncreasedQuantity[0].quantity).toBe(16);
    });

    test('getItemRemovedCart 테스트', () => {
      const emptyCart = getItemRemovedCart(mockCart, 'p1');
      expect(emptyCart.length).toBe(0);
    });

    test('getMaxDiscount 테스트', () => {
      const discounts = [
        { quantity: 5, rate: 0.05 },
        { quantity: 10, rate: 0.1 },
        { quantity: 15, rate: 0.15 }
      ];
      expect(getMaxDiscount(discounts)).toBe(0.15);
    });

    test('getRemainingStock 테스트', () => {
      expect(getRemainingStock(mockProduct, mockCart)).toBe(5); // 20 - 15
    });

    test('getAppliedDiscount 테스트', () => {
      expect(getAppliedDiscount(mockCartItem)).toBe(0.1);
    });

    test('updateProductInList 테스트', () => {
      const products = [mockProduct];
      const updatedProduct = {
        ...mockProduct,
        name: '수정된 상품1',
        price: 12000
      };
      const updatedProducts = updateProductInList(products, updatedProduct);
      expect(updatedProducts[0].name).toBe('수정된 상품1');
      expect(updatedProducts[0].price).toBe(12000);
    });
  });

  describe('훅 테스트 > ', () => {
    describe('useCart 테스트 > ', () => {
      const TestComponent = () => {
        const { cart, addToCart, removeFromCart, updateQuantity, applyCoupon, calculateTotal, selectedCoupon } = useCart();
        const mockProduct: Product = {
          id: 'p1',
          name: '상품1',
          price: 10000,
          stock: 20,
          discounts: [{ quantity: 10, rate: 0.1 }]
        };

        return (
          <div>
            <button onClick={() => addToCart(mockProduct)}>장바구니 추가</button>
            <button onClick={() => removeFromCart('p1')}>장바구니 제거</button>
            <button onClick={() => updateQuantity('p1', 5)}>수량 업데이트</button>
            <button onClick={() => applyCoupon(mockCoupons[0])}>쿠폰 적용</button>
            <div data-testid="cart-length">{cart.length}</div>
            <div data-testid="selected-coupon">{selectedCoupon?.name}</div>
            <div data-testid="total">{calculateTotal().totalAfterDiscount}</div>
          </div>
        );
      };

      test('장바구니 추가/제거 테스트', () => {
        render(
          <Provider>
            <TestComponent />
          </Provider>
        );

        // 장바구니 추가
        fireEvent.click(screen.getByText('장바구니 추가'));
        expect(screen.getByTestId('cart-length')).toHaveTextContent('1');

        // 수량 업데이트
        fireEvent.click(screen.getByText('수량 업데이트'));
        expect(screen.getByTestId('cart-length')).toHaveTextContent('1');

        // 쿠폰 적용
        fireEvent.click(screen.getByText('쿠폰 적용'));
        expect(screen.getByTestId('selected-coupon')).toHaveTextContent('5000원 할인 쿠폰');

        // 장바구니 제거
        fireEvent.click(screen.getByText('장바구니 제거'));
        expect(screen.getByTestId('cart-length')).toHaveTextContent('0');
      });
    });

    describe('useCoupons 테스트 > ', () => {
      const TestComponent = () => {
        const { coupons, addCoupon } = useCoupons(mockCoupons);
        const newCoupon: Coupon = {
          name: '새 쿠폰',
          code: 'NEW10',
          discountType: 'percentage',
          discountValue: 10
        };

        return (
          <div>
            <button onClick={() => addCoupon(newCoupon)}>쿠폰 추가</button>
            <div data-testid="coupons-length">{coupons.length}</div>
            <div data-testid="last-coupon">{coupons[coupons.length - 1]?.name}</div>
          </div>
        );
      };

      test('쿠폰 추가 테스트', () => {
        render(
          <Provider>
            <TestComponent />
          </Provider>
        );

        expect(screen.getByTestId('coupons-length')).toHaveTextContent('2');
        fireEvent.click(screen.getByText('쿠폰 추가'));
        expect(screen.getByTestId('coupons-length')).toHaveTextContent('3');
        expect(screen.getByTestId('last-coupon')).toHaveTextContent('새 쿠폰');
      });
    });

    describe('useProducts 테스트 > ', () => {
      const TestComponent = () => {
        const { products, updateProduct, addProduct } = useProducts(mockProducts);
        const newProduct: Product = {
          id: 'p4',
          name: '상품4',
          price: 40000,
          stock: 30,
          discounts: []
        };

        return (
          <div>
            <button onClick={() => updateProduct({ ...products[0], name: '수정된 상품1' })}>상품 수정</button>
            <button onClick={() => addProduct(newProduct)}>상품 추가</button>
            <div data-testid="products-length">{products.length}</div>
            <div data-testid="first-product">{products[0]?.name}</div>
            <div data-testid="last-product">{products[products.length - 1]?.name}</div>
          </div>
        );
      };

      test('상품 수정/추가 테스트', () => {
        render(
          <Provider>
            <TestComponent />
          </Provider>
        );

        expect(screen.getByTestId('products-length')).toHaveTextContent('3');
        expect(screen.getByTestId('first-product')).toHaveTextContent('상품1');

        // 상품 수정
        fireEvent.click(screen.getByText('상품 수정'));
        expect(screen.getByTestId('first-product')).toHaveTextContent('수정된 상품1');

        // 상품 추가
        fireEvent.click(screen.getByText('상품 추가'));
        expect(screen.getByTestId('products-length')).toHaveTextContent('4');
        expect(screen.getByTestId('last-product')).toHaveTextContent('상품4');
      });
    });
  });
})

