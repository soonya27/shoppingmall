# Shoppingmall site (오아이오아이 리디자인 웹페이지)

## [website link](https://master--glowing-sundae-46f2fe.netlify.app/)
## [github link](https://github.com/soonya27/shoppingmall)

📸🌟 This project is a redesigned and renewed website for the IOIOI shopping mall.

The frontend is built using React, while Firebase is used for the backend and database.

Page access permissions are divided between admin users and regular users.

Admin users can access the "new" page to register new products. Product registration involves uploading images to Cloudinary and adding the product to Firebase.

Regular users are divided into logged-in and non-logged-in users. Only logged-in users can add items to their wishlist (via a heart icon), and the wishlist is also stored in Firebase.

Non-logged-in users can also add products to their shopping cart, which is stored in local storage.

The project is deployed using Netlify. 🚀

### 

(이 프로젝트는 오아이오아이 쇼핑몰 사이트를 리디자인, 리뉴얼 한 웹 사이트 입니다.

프론트엔드에는 React, 백엔드 및 데이터베이스에는 firebase를 사용하여 구축되었습니다.

어드민 사용자와 일반 사용자에 따라 페이지 접근권한을 나누었습니다.

어드민 사용자는 제품을 새로 등록할 수 있는 new 페에지를 접근할수 있고, 제품등록은 cloudinary를 이용하여 이미지를 업로드후 firebase 에 제품목록을 추가합니다.

일반유저 또한 로그인한 유저와 로그인하지 않은 유저로 나뉘어, 로그인한 유저만이 관심상품(하트아이콘)을 추가할 수 있으며 관심상품 목록 또한 firebase에 추가됩니다.

로그인하지 않아도 장바구니에 제품을 추가 할 수 있으며, localstorage에 저장됩니다.

Netlify를 이용하여 배포하였습니다.)


## 🌟Features (주요 기능)

- User account creation and authentication with google (google을 통한 사용자 계정 생성 및 로그인) - Firebase
- Page differentiation based on user roles (regular user, admin user) (사용자별 권한에 따른 페이지 구분 일반사용자, 어드민사용자 : 메뉴바 new메뉴와 AddProduct 페이지 접근권한)
- Logged-in users can add items to their shopping cart and save liked product lists to the database (로그인한 사용자가 쇼핑카트 추가와, 좋아요 제품목록을 데이터베이스에 저장, 데이터 불러오기)
- Items added to the shopping cart by non-logged-in users are stored in local storage. (로그인하지 않은 사용자가 쇼핑카트 제품추가하면 localstorage에 저장)
- Data state management using React Query, with cache updates using mutate. (react query를 이용한 데이터 상태 관리, mutate를 이용한 캐시 업데이트)
- Global state management with Context (AuthContext(로그인 유저 정보), MediaQueryContext(미디어 쿼리 데이터), ModalContext(공통 AlertModal) 로 전역상태 관리)


## 🌟Tech Stack (기술 스택)

- **Frontend:**
  - React.js
  - Javascript
  - postcss
  - cloudinary
  - react-router-dom
  - react-query
  - react-spinners
  - react-responsive
  - modal portal
  - swiper
  - uuid

- **Backend:**
  - Firebase

- **Others:**
  - Git (Version control)
  - Prettier (Code formatting and static analysis)

- **Deployment:**
  - Netlify

## 🌟Feedback
I'm always looking to improve! If you have any feedback, suggestions, or bug reports, feel free to open an issue or reach out to me directly.
Thank you for visiting my portfolio website!

( 항상 개선을 위한 피드백, 제안 또는 버그 신고를 환영합니다! 언제든지 문제를 제기하거나 저에게 직접 문의해 주세요.
 제 홈페이지를 방문해 주셔서 감사합니다!)



## 🌟UI
### pc
![Shoppingmall pc](https://res.cloudinary.com/dpyobc2hx/image/upload/v1714022177/shoppingmall_redesign_pc_ltvzva.png)

### mobile
![Shoppingmall mobile](https://res.cloudinary.com/dpyobc2hx/image/upload/v1714022169/shoppingmall_redesign_mobile_xf8cr8.png)

### auth user에 따른 메뉴 접근 제한
![Shoppingmall auth user](https://res.cloudinary.com/dpyobc2hx/image/upload/v1714022139/shoppingmall_redesign_auth_user_x3dfxx.png)

 ### firebase database 구조
 ![firebase database](https://res.cloudinary.com/dpyobc2hx/image/upload/v1714023309/firebase_database_hkkjgh.png)



#
## 🌟구동 영상
### [youtube link](https://youtu.be/JJqlFYGE1gw?si=5Cod4zknFLhlW1hz)



## 🌟query hooks Code block
### react query 캐시 관리 및 mutation, invalidation hooks로 관리

### src/hooks/useProducts.js
```js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addBookmarkByUser, addNewProduct, getProduct, removeFromBookmark } from '../api/firebase';


export default function useProducts(uid) {
    const queryClient = useQueryClient();

    const productQuery = useQuery({
        queryKey: ['products', uid || ''],
        queryFn: async () => getProduct(uid),
    });

    const addProduct = useMutation(
        {
            mutationFn: ({ form, url }) => addNewProduct(form, { defaultImageUrl: url.defaultImageUrl, hoverImageUrl: url.hoverImageUrl }),
            mutationKey: ['products'],
            onSuccess: () => queryClient.invalidateQueries(['products'])
        }
    );

    const addBookmark = useMutation(
        {
            mutationFn: ({ isBookmark, product }) => {
                return isBookmark ? removeFromBookmark(uid, product.id)
                    : addBookmarkByUser({ user: uid, product });
            },
            mutationKey: ['products'],
            onSuccess: () => queryClient.invalidateQueries(['products'])
        }
    );

    return { productQuery, addProduct, addBookmark }
}

```

### src/components/ProductsList/ProductsList.jsx  (productQuery)
```js
  import useProducts from '../../hooks/useProducts';

  //hooks 수정 전 
  const {
      isLoading,
      error,
      data: products
  } = useQuery({
      queryKey: ['products', uid || ''],
      queryFn: async () => getProduct(uid),
  });

    
  //hooks 수정 후
  const { productQuery: {
      isLoading,
      error,
      data: products
  } } = useProducts(uid);

```


### src/pages/AddProduct/AddProduct.jsx  (addProduct)
```js
  import useProducts from '../../hooks/useProducts';

  //hooks 수정 전 
  const queryClient = useQueryClient();
  const addProduct = useMutation(
      {
          mutationFn: ({ form, url }) => addNewProduct(form, { defaultImageUrl: url.defaultImageUrl, hoverImageUrl: url.hoverImageUrl }),
          mutationKey: ['products'],
          onSuccess: () => queryClient.invalidateQueries(['products'])
      }
  );
    


  //hooks 수정 후
    const { addProduct } = useProducts();


  //---(사용하는곳)---
  addProduct.mutate({
      form, url: { defaultImageUrl, hoverImageUrl }
  },{
      onSuccess: () => {
          console.log('성공적으로 추가');
          setForm(DEFAUT_FORM);
      }
  });

```


### src/components/ProductCard/ProductCard.jsx  (addBookmark)
```js
  import useProducts from '../../hooks/useProducts';

  //hooks 수정 전 
  const queryClient = useQueryClient();
  isBookmark ? await removeFromBookmark(uid, product.id)
        : await addBookmarkByUser({ user: uid, product });
    queryClient.invalidateQueries(['products']);
    


  //hooks 수정 후
  const { addBookmark } = useProducts(uid);
  addBookmark.mutate({
      isBookmark, product
  });

```


## 🌟bookmark 추가 및 products 쿼리 Code block
#### cart목록과 같이 제품의 id를 bookmark목록에 저장후 getProduct()로 제품 목록을 가여올때 해당 user의 bookmark여부를 체크하여 product key값을 추가
```js
  export async function addBookmarkByUser({ user, product }) {
      set(ref(database, 'bookmarks/' + user + '/' + product.id), {
          ...product,
      });
  }

  export async function removeFromBookmark(user, productId) {
      return remove(ref(database, 'bookmarks/' + user + '/' + productId));
  }

  export async function getBookmarks(uid) {
      return get(child(ref(database), `bookmarks/${uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
              const data = Object.values(snapshot.val())
              return data.map(data => data.id);
          }
          return [];
      }).catch((error) => {
          console.error(error);
      });
  }

  export async function getProduct(uid) {
      const bookmarkList = uid ? await getBookmarks(uid) : [];
      return get(child(ref(database), `products`)).then((snapshot) => {
          if (snapshot.exists()) {
              const data = Object.values(snapshot.val())
              const isBookmarkList = data.map(product => ({
                  ...product,
                  isBookmark: bookmarkList.includes(product.id)
              }))
              return isBookmarkList;
          }
          return [];
      }).catch((error) => {
          console.error(error);
      });
  }

```



