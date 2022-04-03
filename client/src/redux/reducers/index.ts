import { combineReducers } from "redux";
import { Category, User } from "../interface";
import { Product } from "../interface";

/**
 *
 * import .... from 'userReducer'
 * import .... from 'productsReducer'
 *
 */
import { userReducer } from "./reducerUser";
import { productDetailReducer } from "./reducerProductsDetail";
import { PRODUCTS, reducerProduct } from "./ProductsReducer";
import { ORDER_STATE, reducerOrderProducts } from "./orderProductsReducer";
import { CATEGORIES, reducerCategories } from "./categoriesReducer";

interface GLOBAL_STATE {
  user: User | null;
  productDetail: Product;
  products: PRODUCTS;
  orderedProducts: ORDER_STATE;
  categories: CATEGORIES;
}

export const rootReducer = combineReducers<GLOBAL_STATE>({
  user: userReducer,
  productDetail: productDetailReducer,
  products: reducerProduct,
  orderedProducts: reducerOrderProducts,
  categories: reducerCategories
});

export type State = ReturnType<typeof rootReducer>;
