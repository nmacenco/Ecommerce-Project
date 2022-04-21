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
import adminUsersReducer, { ADMIN_USERS } from "./adminReducerUser";
import { CART, reducerCart } from "./cartReducer";
import { COUNTRIES, countriesReducer } from "./countriesReducer";
import { userDetailReducer, USER_STATE } from "./userDetailReducer";
import { ORDERS , ordersAdminReducer } from "./adminOrdersReducer";
import { ordersUserReducer, ORDERS_USER } from "./ordersUserReducer";

interface GLOBAL_STATE {
  user: User | null;
  productDetail: Product;
  products: PRODUCTS;
  categories: CATEGORIES;
  orderedProducts: ORDER_STATE;
  // filteredProducts: FILTERED_STATE;
  brands: BRANDS;
  adminUsers: ADMIN_USERS;
  page: PAGE;
  cart: CART;
  countries: COUNTRIES;
  userDetail: USER_STATE;
  ordersAdmin : ORDERS ; 
  ordersUser : ORDERS_USER ; 
  activeOrder: ORDERS_USER;
}

export const rootReducer = combineReducers<GLOBAL_STATE>({
  user: userReducer,
  productDetail: productDetailReducer,
  products: reducerProduct,
  categories: reducerCategories,
  orderedProducts: reducerOrderProducts,
  // filteredProducts: reducerFilterProducts,
  brands: reducerBrands,
  page: setPageReducer,
  cart: reducerCart,
  countries: countriesReducer,
  adminUsers: adminUsersReducer,
  userDetail: userDetailReducer,
  ordersAdmin : ordersAdminReducer,
  ordersUser : ordersUserReducer,
  activeOrder: ordersUserReducer
});

export type State = ReturnType<typeof rootReducer>;
