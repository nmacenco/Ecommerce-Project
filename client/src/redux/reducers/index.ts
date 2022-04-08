import { combineReducers } from "redux";
import { Page, User } from "../interface";
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
import { FILTERED_STATE, reducerFilterProducts } from './filterByCategoryReducer';
import { BRANDS, reducerBrands } from "./brandsReducer";
import setPageReducer, { PAGE } from "./setPageReducer";
import { CART, reducerCart } from "./cartReducer";
import { COUNTRIES, countriesReducer } from "./countriesReducer";

interface GLOBAL_STATE {
  user: User | null;
  productDetail: Product;
  products: PRODUCTS;
  categories: CATEGORIES;
  orderedProducts: ORDER_STATE;
  filteredProducts: FILTERED_STATE;
  brands: BRANDS;
  page: PAGE;
  cart: CART;
  countries: COUNTRIES
}

export const rootReducer = combineReducers<GLOBAL_STATE>({
  user: userReducer,
  productDetail: productDetailReducer,
  products: reducerProduct,
  categories: reducerCategories,
  orderedProducts: reducerOrderProducts,
  filteredProducts: reducerFilterProducts,
  brands: reducerBrands,
  page: setPageReducer,
  cart: reducerCart,
  countries: countriesReducer
});

export type State = ReturnType<typeof rootReducer>;
