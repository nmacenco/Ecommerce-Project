export enum TYPES_USER {
  CREATE_USER,
  GET_USER,
  LOGOUT_USER,
  FIND_USER,
}

export enum TYPES {
  PRODUCT_DETAIL = "PRODUCT_DETAIL",
  DELETE_PRODUCT_DETAIL = "DELETE_PRODUCT_DETAIL",
}

export enum TYPES_PRODUCT {
    GET_PRODUCTS,
    SEARCH_PRODUCTS
  GET_PRODUCTS = "GET_PRODUCTS",
  ORDER_PRODUCTS = "ORDER_PRODUCTS",
}

export interface User {
  name: string;
  lastName: string;
  password: string;
  email: string;
  token: string;
}

export interface Product {
  id?: number;
  subcategory_id: string[];
  name: string;
  brand: string;
  image: string;
  price: number;
  description: string;
  weigth: number;
  stock: number;
}

export interface AXIOSDATA {
  successMsg: string;
  data: Product[];
}

/**
 * USER:
 */

export interface CREATE_USER {
  type: TYPES_USER.CREATE_USER;
  payload: User;
}
export interface GET_USER {
  type: TYPES_USER.GET_USER;
  payload: User;
}
export interface LOGOUT_USER {
  type: TYPES_USER.LOGOUT_USER;
  payload: null;
}
export interface FIND_USER {
  type: TYPES_USER.FIND_USER;
  payload: User;
}

//=====================
//Products Actions
export interface PRODUCT_DETAIL {
  type: TYPES.PRODUCT_DETAIL;
  payload: Product;
}

export interface ORDER_PRODUCTS {
  type: TYPES_PRODUCT.ORDER_PRODUCTS;
  //aca deberia ir un objeto con value(strinfg) y products(array de productos)
  payload: any;
}

export interface GET_PRODUCTS {
  type: TYPES_PRODUCT.GET_PRODUCTS;
  payload: Product[];
}

export interface SEARCH_PRODUCTS{
    type:TYPES_PRODUCT.SEARCH_PRODUCTS,
    payload:string
}

export interface DELETE_PRODUCT_DETAIL {
  type: TYPES.DELETE_PRODUCT_DETAIL;
  payload: Product;
}

export type Actions = PRODUCT_DETAIL | DELETE_PRODUCT_DETAIL;


export type UserActions = CREATE_USER | GET_USER | LOGOUT_USER | FIND_USER;

export type ProductActions = GET_PRODUCTS | ORDER_PRODUCTS| SEARCH_PRODUCTS;
