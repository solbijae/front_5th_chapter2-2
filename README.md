## 배포 링크
https://front-5th-chapter2-2.netlify.app/

## 과제의 핵심취지

- React의 hook 이해하기
- 함수형 프로그래밍에 대한 이해
- 액션과 순수함수의 분리

## 과제에서 꼭 알아가길 바라는 점

- 엔티티를 다루는 상태와 그렇지 않은 상태 - cart, isCartFull vs isShowPopup
- 엔티티를 다루는 컴포넌트와 훅 - CartItemView, useCart(), useProduct()
- 엔티티를 다루지 않는 컴포넌트와 훅 - Button, useRoute, useEvent 등
- 엔티티를 다루는 함수와 그렇지 않은 함수 - calculateCartTotal(cart) vs capaitalize(str)

### 기본과제

- Component에서 비즈니스 로직을 분리하기
- 비즈니스 로직에서 특정 엔티티만 다루는 계산을 분리하기
- 뷰데이터와 엔티티데이터의 분리에 대한 이해
- entities -> features -> UI 계층에 대한 이해

- [x] Component에서 사용되는 Data가 아닌 로직들은 hook으로 옮겨졌나요?
- [x] 주어진 hook의 책임에 맞도록 코드가 분리가 되었나요?
- [x] 계산함수는 순수함수로 작성이 되었나요?
- [x] Component에서 사용되는 Data가 아닌 로직들은 hook으로 옮겨졌나요?
- [x] 주어진 hook의 책임에 맞도록 코드가 분리가 되었나요?
- [x] 계산함수는 순수함수로 작성이 되었나요?
- [x] 특정 Entitiy만 다루는 함수는 분리되어 있나요?
- [x] 특정 Entitiy만 다루는 Component와 UI를 다루는 Component는 분리되어 있나요?
- [x] 데이터 흐름에 맞는 계층구조를 이루고 의존성이 맞게 작성이 되었나요?

### 심화과제

- 재사용 가능한 Custom UI 컴포넌트를 만들어 보기
- 재사용 가능한 Custom 라이브러리 Hook을 만들어 보기
- 재사용 가능한 Custom 유틸 함수를 만들어 보기
- 그래서 엔티티와는 어떤 다른 계층적 특징을 가지는지 이해하기

- [x] UI 컴포넌트 계층과 엔티티 컴포넌트의 계층의 성격이 다르다는 것을 이해하고 적용했는가?
- [x] 엔티티 Hook과 라이브러리 훅과의 계층의 성격이 다르다는 것을 이해하고 적용했는가?
- [x] 엔티티 순수함수와 유틸리티 함수의 계층의 성격이 다르다는 것을 이해하고 적용했는가?

## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->

### 과제를 하면서 내가 제일 신경 쓴 부분은 무엇인가요?
- 이번 과제를 통해 배우고싶은 부분은 다음과 같았습니다.
    - 서비스의 계층화
    - 엔티티란 무엇인가. 엔티티를 기준으로 나눈다는건 어떤 의미인가
    - 순수한 부분(함수, ui)과 엔티티와 관련된 부분의 차이는 무엇인가
- 엔티티를 중심으로 계속 생각하다보니 뭐든 엔티티로 생각하는 엔티티 지옥에 빠져버려서 아래와 같은 폴더 구조로 진행을 하게 되었습니다.
    
    ```jsx
    📦refactoring_1st_try
     ┣ 📂components
     ┃ ┣ 📜AdminPage.tsx
     ┃ ┗ 📜CartPage.tsx
     ┣ 📂entities
     ┃ ┣ 📂cart
     ┃ ┃ ┣ 📂hooks
     ┃ ┃ ┃ ┗ 📜useCart.ts
     ┃ ┃ ┣ 📂utils
     ┃ ┃ ┃ ┗ 📜cart.ts
     ┃ ┃ ┗ 📜types.ts
     ┃ ┣ 📂discount
     ┃ ┃ ┣ 📂data
     ┃ ┃ ┃ ┗ 📜initialCoupon.ts
     ┃ ┃ ┣ 📂hooks
     ┃ ┃ ┃ ┗ 📜useCoupon.ts
     ┃ ┃ ┗ 📜types.ts
     ┃ ┗ 📂product
     ┃ ┃ ┣ 📂data
     ┃ ┃ ┃ ┗ 📜initialProduct.ts
     ┃ ┃ ┣ 📂hooks
     ┃ ┃ ┃ ┣ 📜useEditingProduct.ts
     ┃ ┃ ┃ ┣ 📜useOpenProduct.ts
     ┃ ┃ ┃ ┗ 📜useProduct.ts
     ┃ ┃ ┗ 📜types.ts
     ┣ 📜App.tsx
     ┗ 📜main.tsx
    ```
    
    그런데 코드를 분리할수록 점점 복잡해지고 가독성이 급격히 떨어졌습니다.
    
    그 상태로 Q&A세션과 멘토링 세션에 들어갔는데 위의 방식대로 접근하기에는 이번 과제의 규모가 작고, 또 과제 목적에 부합하지 않는다는 생각을 하게 되었습니다.
    
- 그래서 **과제를 리셋**하고, 수요일부터 다시하기 시작했습니다. 먼저 계층을 시각적으로 이해하기 위해 그려보았습니다.
  <img width="1805" alt="shapes at 25-04-24 17 00 42" src="https://github.com/user-attachments/assets/1befdd13-0639-4804-b69c-15c2ba3f4894" />

    - 변화된 폴더 구조입니다.
    ```
    📦refactoring
     ┣ 📂atoms
     ┃ ┣ 📜adminAtoms.ts
     ┃ ┣ 📜appAtoms.ts
     ┃ ┗ 📜cartAtoms.ts
     ┣ 📂components
     ┃ ┣ 📂CartList
     ┃ ┃ ┣ 📜AddedItems.tsx
     ┃ ┃ ┣ 📜ApplyCoupon.tsx
     ┃ ┃ ┣ 📜CartList.tsx
     ┃ ┃ ┗ 📜OrderSummary.tsx
     ┃ ┣ 📂CouponManagement
     ┃ ┃ ┣ 📜AddCoupon.tsx
     ┃ ┃ ┣ 📜CouponList.tsx
     ┃ ┃ ┗ 📜CouponManagement.tsx
     ┃ ┣ 📂ProductList
     ┃ ┃ ┣ 📜ProductCard.tsx
     ┃ ┃ ┗ 📜ProductList.tsx
     ┃ ┗ 📂ProductManagement
     ┃ ┃ ┣ 📜AddProduct.tsx
     ┃ ┃ ┣ 📜AdminProductList.tsx
     ┃ ┃ ┗ 📜ProductManagement.tsx
     ┣ 📂constants
     ┃ ┣ 📜coupon.ts
     ┃ ┣ 📜index.ts
     ┃ ┗ 📜product.ts
     ┣ 📂hooks
     ┃ ┣ 📜index.ts
     ┃ ┣ 📜useAddCoupon.ts
     ┃ ┣ 📜useAddNewProduct.ts
     ┃ ┣ 📜useCart.ts
     ┃ ┣ 📜useCoupon.ts
     ┃ ┣ 📜useEditProduct.ts
     ┃ ┣ 📜useProduct.ts
     ┃ ┗ 📜useToggleProduct.ts
     ┣ 📂models
     ┃ ┣ 📜cart.ts
     ┃ ┗ 📜product.ts
     ┣ 📂pages
     ┃ ┣ 📜AdminPage.tsx
     ┃ ┗ 📜CartPage.tsx
     ┣ 📜App.tsx
     ┗ 📜main.tsx
     ```
- 계층을 시각화하여 그려본 후, Cart/Admin 폴더를 만들고 그 아래 계층 폴더까지 만든 시점에 **component 폴더 depth에 대한 고민**이 생겼습니다.
    - `ProductList`와 같은 큰 컴포넌트 안에 `ProductListItem`, `ProductDetails`, `ProductHeader` 등 하위 컴포넌트들이 생길 때, 이들을 **어떻게 구분할지**에 대해 고민했습니다.
        - 한 가지 방법은 `ProductList/parts/`처럼 **하위 폴더를 만들어서 세부적인 컴포넌트를 분리**하는 것입니다. 이렇게 하면 각 하위 컴포넌트의 역할을 명확히 구분할 수 있습니다.
        - 또 다른 방법은 `ProductListItem.tsx`와 같은 파일 이름을 **직접적으로 명확하게 지정**하여, 더 이상 세부 폴더를 만들지 않고 이름만으로 구분하는 방법도 고려하였습니다.
    - **계층이 계속 깊어질 때의 우려**
        - 계속해서 계층이 **깊어질 경우**에 대한 고민도 있었습니다. 예를 들어, `components/ProductList/parts/ProductListItem/parts/DiscountBadge.tsx`처럼 3단계 이상의 깊이가 생길 수 있는데, 이 경우 경로가 너무 길어져서 **폴더 구조와 파일 경로**를 파악하기 어려워질 수 있다는 우려가 있었습니다.
        - **폴더 깊이가 3단계를 넘어서면** 컴포넌트의 구분이 복잡해지고, 유지보수성이 떨어질 수 있습니다. 또한, 너무 깊은 계층 구조는 개발자가 **import 경로를 파악하기 어렵게** 만들어 코드 가독성을 해칠 수 있겠다는 생각이 들었습니다.
    - **구조 설계의 방향성**
        - 폴더 깊이는 최대한 **2~3단계 이내**로 유지하는 것이 바람직하다고 판단했습니다. 이렇게 하면 코드의 가독성을 높이고, 프로젝트 규모가 커져도 유지보수가 쉬워집니다.
        - **하위 컴포넌트가 많아질 경우**에만 폴더를 추가로 생성하는 방식을 채택하고, 그 외에는 가능한 한 **단일 파일로 관리**할 수 있도록 유연한 구조를 추구하고자 했습니다.
- 기존에 jQuery를 사용해서 만들던 폴더 구조와 많이 달라서 리액트 기반 폴더구조에 대해 조금 더 찾다보니 **`utils` vs `models` vs `lib` 차이**도 궁금해졌습니다.
    
    
    | 항목 | `utils` | `models` | `lib` |
    | --- | --- | --- | --- |
    | 목적 | **짧고 재사용성 높은 순수 함수** | **앱의 도메인 중심 로직** | **라이브러리 설정, 외부 연동, 공통 시스템 구성** |
    | 책임 | 포괄적, 로직 없이 처리만 | 비즈니스 중심 | 시스템 중심, 외부 연동 중심 |
    | 의존성 | 거의 없음 | 도메인 타입에 의존 | 외부 API, SDK, 설정에 의존 가능 |
    | 범용성 | 매우 높음 (전역 도우미) | 도메인에 종속적 | 시스템 전반에 쓰이지만 로직이 크고 복잡 |
    | 예시 | `formatDate`, `debounce` | `calculateCartTotal`, `getItemAddedCart` | `firebase.ts`, `axiosInstance.ts`, `i18n.ts`, `authClient.ts` |
    - **폴더 구조를 깊게 고민해보면서 코드를 짜니 이전에 읽어봤던 FSD도 더 찾아보게 되었는데 이정도의 폴더구조는 얼마나 큰 규모의 프로젝트여야 사용될까 궁금해졌습니다.**
- 폴더를 나누면서 또 고민됐던 부분은 **상위 컴포넌트에서 계산을 해서 보내주느냐, 아니면 하위에서 계산하느냐**였습니다 (상태랑은 관련 없는 계산입니다).
    - 고민 해본 결과, 순수하게 UI만 담당하는 컴포넌트에서는 UI를 그리는 것과, type 정도만 import해오는 것으로 결정했습니다.
    - 그렇게 하면 비즈니스 로직 흐름이 한군데에서 모이기 때문에, 하위 컴포넌트를 더욱 독립적으로 사용 가능해서 재사용성과 테스트 용이성에 우위가 있다고 생각했습니다.

### 과제를 다시 해보면 더 잘 할 수 있었겠다 아쉬운 점이 있다면 무엇인가요?
- import 해오는 순서나 prettier 등 예쁘고 가독성 좋게 정리할 시간이 없었습니다
- msw를 적용할 시간이 없었습니다
    - 그래도 공부는 조금 해보았습니다🫠
        - msw 이해하기
            - 일단 service worker란? 비교적 최근에 도입된 웹 표준 기술로써 브라우저에 들어왔다 나가는 응답과 요청 중간을 감시하여 부가적인 동작을 할 수 있도록 함
            - msw란? mocking service worker의 약자로 말 그대로 service worker를 이용하여 가짜 Api를 mocking 함. 즉, 브라우저에서 기생하면서 실제 백엔드 처럼 데이터를 건내주고 받는 역할
            
            ![image](https://github.com/user-attachments/assets/2afd39e4-285b-4668-b21b-07287636ea3c)

            작동되는 원리는
            1. 브라우저가 서비스 워커에 요청을 보내고
            2. 서비스 워커가 요청을 복사한다.
            3. 요청과 일치하는 응답을 생성하고
            4. 모의 작성된 응답을 서비스 워커에 보낸다.
            5. 브라우저는 모의로 작성된 응답을 제공받는다.
- 공통으로 사용되는 button이나 card같은 것도 shared ui로 빼고싶었는데 못했습니다
- 과제를 처음부터 다시 진행하게된게 아쉽습니다. 그리고 그 후로도 전체를 다 고치지는 않아도 여러번 엎었습니다. 그래도 이렇게 엎다보니 점점 이해가 가는 것 같아서 테오 말씀대로 잘 헤맷다고 생각(정신승리..?)하는 중입니다😂

### 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문 편하게 남겨주세요 :)
- **Porps가 너무 많은 경우 전역 상태 관리는 하위 컴포넌트에서 불러오는게 맞는지 궁금합니다. 그런데 그렇게 하면 단순 UI를 구분하는 의미가 없어지는 것같아서 일단은 모두 props로 받는 형식으로 작성했습니다.**
    
    ```jsx
    ...
    export const ProductManagement = ({ products, onProductUpdate, onProductAdd }: Props) => {
    	 ...
    
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
    
    import { Product } from '../../../types';
    
    interface Props {
      products: Product[];
      openProductIds: string[];
      toggleProductAccordion: (productId: string) => void;
      editingProduct: Product | null;
      handleEditProduct: (product: Product) => void;
      handleProductNameUpdate: (productId: string, name: string) => void;
      handlePriceUpdate: (productId: string, price: number) => void;
      handleStockUpdate: (productId: string, stock: number) => void;
      handleEditComplete: () => void;
      handleAddDiscount: (productId: string) => void;
      handleRemoveDiscount: (productId: string, index: number) => void;
      newDiscount: { quantity: number; rate: number };
      setNewDiscount: (discount: { quantity: number; rate: number }) => void;
    }
    
    export const AdminProductList = ({ 
      products,
      openProductIds,
      toggleProductAccordion,
      editingProduct,
      handleEditProduct,
      handleProductNameUpdate,
      handlePriceUpdate,
      handleStockUpdate,
      handleEditComplete,
      handleAddDiscount,
      handleRemoveDiscount,
      newDiscount,
      setNewDiscount,
    }: Props) => {
      return (
        <div className="space-y-2">
          ...
        </div>
      )
    }
    ```
    
- **Entity로 나는다는 개념이 아직 좀 헷갈립니다.**
    Entity로 나눈다는건 components안에 cart/admin으로 나누는게 아니라 cart/product/coupon으로 나누는 걸까요?
    아니면, 제가 한 것 처럼 UI상으로 보이는대로 나누고, 순수하게 UI를 그려주는 부분과 상태 변경을 하는 부분을 나누면 되는걸까요?
    Entity랑 순수한 부분을 나누는거랑 섞어서 생각해서 잘못되게 결론을 내린건지 모르겠습니다🥲

- **답변**:
  FE의 프로그램은 데이터 -> 화면 -> 행동 -> 데이터 -> 화면 ... 이러한 방식의 사이클을 가집니다. 그래서 프로그램을 데이터의 관점으로 화면의 관점으로 기능의 관점으로 바라보게 되죠.

  이번 과제에서는 여러가지의 분리 기준이 있습니다.
  
  클라이언트 / 어드민
  장바구니 / 쿠폰
  상품관리 등등 
  
  아마 components의 폴더 구조는 아마 화면의 관점으로 분리를 했을 거에요. 그편이 훨씬 더 명확하니까요.
  
  /CartList
  /CouponManagement
  /ProcutList
  
  그렇지만 이러한 폴더구조가 명확하게 데이터를 다루는 관점하고는 다릅니다. 데이터는 화면과 무관하니 데이터를 다룰때에는 
  
  /cart
  /product
  /coupon
  
  이렇게 나누게 되겠죠. 화면과 무관하게 데이터만 다루는 식으로 만들게 될거에요.
  
  여기에 없지만 Button, InputField 등은 어떨까요? 이러한 컴포넌트들은 엔티티를 가지고 있지 않습니다.
  
  useLocalStorage는 어떨까요? useCart와는 달리 엔티티를 가지지 않습니다.
  
  같은 화면을 다루더라도 엔티티가 있는 것과 없는 것의 분류가 다르고 같은 hook이라도 엔티티를 다루는 hook과 그렇지 않은 훅은 다릅니다. 이러한 기준으로 보면 일단 엔티티를 다루지 않는 세상이 크게 하나가 존재하구요, 엔티티를 다루더라도 데이터 영역, 순수함수 영역, 상태를 가지는 hook영역, 화면 영역이 각기 다른 역할을 가지고 있다는 것입니다.
  
  그래서 각 구조와 범위를 규정할때 엔티티가 여러가지로 중요한 분류 기준이 되어준다는 것입니다. 이점을 이해하면 훨씬 더 코드의 단계를 다채롭게 바라볼 수 있을 거에요. 
