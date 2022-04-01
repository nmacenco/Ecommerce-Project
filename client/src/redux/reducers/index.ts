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

interface GLOBAL_STATE {
  user: User | null;
  productDetail: Product;
  products: PRODUCTS;
}

export const rootReducer = combineReducers<GLOBAL_STATE>({
  user: userReducer,
  productDetail: productDetailReducer,
  products: reducerProduct
});

export type State = ReturnType<typeof rootReducer>
