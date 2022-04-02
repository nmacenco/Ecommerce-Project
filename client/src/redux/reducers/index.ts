
import { combineReducers } from 'redux';
import { User } from '../interface';
import { Product } from '../interface';

/**
 *
 * import .... from 'userReducer'
 * import .... from 'productsReducer'
 *
 */
import { userReducer } from './reducerUser';
import { productDetailReducer } from './reducerProductsDetail';
import { PRODUCTS, reducerProduct } from './ProductsReducer';
import { OrderState, reducerOrderProducts } from './orderProductsReducer';

interface GLOBAL_STATE {
  user: User | null;
  productDetail: Product;
  products: PRODUCTS;
  orderedProducts: any;
}

export const rootReducer = combineReducers<GLOBAL_STATE>({
  user: userReducer,
  productDetail: productDetailReducer,
  products: reducerProduct,
  orderedProducts: reducerOrderProducts
});

export type State = ReturnType<typeof rootReducer>
