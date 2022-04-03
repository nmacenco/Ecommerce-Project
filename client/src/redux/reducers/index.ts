import { combineReducers } from "redux";
import { Category, User } from "../interface";
import { Product } from "../interface";
/**
 * import .... from 'userReducer'
 * import .... from 'productsReducer'
 */
import { userReducer } from './reducerUser';
import { productDetailReducer } from './reducerProductsDetail';
import { PRODUCTS, reducerProduct } from './ProductsReducer';
import { reducerCategories, CATEGORIES } from './categoriesReducer';
import { ORDER_STATE, reducerOrderProducts } from './orderProductsReducer';
import { FILTERED_STATE , reducerFilterProducts } from './filterByCategoryReducer';

interface GLOBAL_STATE {
  user: User | null;
  productDetail: Product;
  products: PRODUCTS ;
  categories : CATEGORIES;
  orderedProducts: ORDER_STATE;
  filteredProducts: FILTERED_STATE;
}

export const rootReducer = combineReducers<GLOBAL_STATE>({
  user: userReducer,
  productDetail: productDetailReducer,
  products: reducerProduct ,
  categories : reducerCategories,
  orderedProducts: reducerOrderProducts ,
  filteredProducts : reducerFilterProducts
});

export type State = ReturnType<typeof rootReducer>;
