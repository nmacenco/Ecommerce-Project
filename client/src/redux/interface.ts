export enum TYPES_USER {
  CREATE_USER,
  GET_USER,
  LOGOUT_USER,
  FIND_USER,
}

export enum TYPES_DETAIL {
  PRODUCT_DETAIL = "PRODUCT_DETAIL",
  DELETE_PRODUCT_DETAIL = "DELETE_PRODUCT_DETAIL",
}

export enum TYPES_ADMIN {
  DELETE_PRODUCTS = "DELETE_PRODUCTS",
}

export enum TYPES_CATEGORIES {
  GET_CATEGORIES = "GET_CATEGORIES",
  GET_SUBCATEGORIES = "GET_SUBCATEGORIES",
}

export enum TYPES_BRANDS {
  GET_BRANDS = "GET_BRANDS",
}
export enum TYPES_PAGE {
  SET_PAGE = "SET_PAGE",
}

export enum TYPES_PRODUCT {
  SEARCH_PRODUCTS = "SEARCH_PRODUCTS",
  GET_PRODUCTS = "GET_PRODUCTS",
  ORDER_PRODUCTS = "ORDER_PRODUCTS",
  CHARGE_FILTERS = "CHARGE_FILTERS",
  REMOVE_FILTER = "REMOVE_FILTER",
  FILTERED_CAT_PRODUCTS = "FILTERED_CAT_PRODUCTS",
  FILTERED_BRAND_PRODUCTS = "FILTERED_BRAND_PRODUCTS",
  RESET_FILTERED_PRODUCTS = "RESET_FILTERED_PRODUCTS",
  RESET_PRODUCTS = "RESET_PRODUCTS",
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  FILTER_BY_BRAND = "FILTER_BY_BRAND",
}

//=======================
// Objects Interfaces

export type Page = number;

export interface User {
  name: string;
  lastName: string;
  password: string;
  email: string;
  token: string;
}

export interface ProductForm {
  id?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  weight: number;
  stock: number;
  soldCount: number;
  SubcategoryId: number;
  BrandId: number;
}

export interface Brand {
  name: string;
  id: number;
}

export interface Product {
  SubcategoryId: number;
  id?: number;
  name: string;
  image: string;
  price: number;
  description: string;
  weight: number;
  stock: number;
  soldCount: number;
  BrandId: number;
  brand: string;
  subcategory: string;
  CategoryId: number;
  category: number;
}

export interface Category {
  id?: number;
  name: string;
}
export interface Subcategory {
  id?: number;
  name: string;
  CategoryId: number;
}

//=======================
// User Actions

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

//=======================
// Category Actions

export interface GET_CATEGORIES {
  type: TYPES_CATEGORIES.GET_CATEGORIES;
  payload: Category[];
}
export interface GET_SUBCATEGORIES {
  type: TYPES_CATEGORIES.GET_SUBCATEGORIES;
  payload: Subcategory[];
}

//======================
//Brands Actions

export interface GET_BRANDS {
  type: TYPES_BRANDS.GET_BRANDS;
  payload: Brand[];
}
//======================
//Page Actions

export interface SET_PAGE {
  type: TYPES_PAGE.SET_PAGE;
  payload: Page;
}

//=====================
//Products Actions
export interface PRODUCT_DETAIL {
  type: TYPES_DETAIL.PRODUCT_DETAIL;
  payload: Product;
}

export interface ORDER_PRODUCTS {
  type: TYPES_PRODUCT.ORDER_PRODUCTS;
  //aca deberia ir un objeto con value(strinfg) y products(array de productos)
  payload: any;
}
export interface CHARGE_FILTERS {
  type: TYPES_PRODUCT.CHARGE_FILTERS;
  payload: any;
}
export interface REMOVE_FILTER {
  type: TYPES_PRODUCT.REMOVE_FILTER;
  payload: any;
}
export interface FILTERED_CAT_PRODUCTS {
  type: TYPES_PRODUCT.FILTERED_CAT_PRODUCTS;
  //aca deberia ir un objeto con value(strinfg) y products(array de productos)
  payload: any;
}
export interface FILTERED_BRAND_PRODUCTS {
  type: TYPES_PRODUCT.FILTERED_BRAND_PRODUCTS;
  payload: any;
}
export interface FILTER_BY_BRAND {
  type: TYPES_PRODUCT.FILTER_BY_BRAND;
  //aca deberia ir un objeto con value(strinfg) y products(array de productos)
  payload: any;
}
export interface RESET_FILTERED_PRODUCTS {
  type: TYPES_PRODUCT.RESET_FILTERED_PRODUCTS;
  //aca deberia ir un objeto con value(strinfg) y products(array de productos)
  payload: any;
}

export interface GET_PRODUCTS {
  type: TYPES_PRODUCT.GET_PRODUCTS;
  payload: Product[];
}
export interface RESET_PRODUCTS {
  type: TYPES_PRODUCT.RESET_PRODUCTS;
  payload: [];
}
export interface PRODUCT_NOT_FOUND {
  type: TYPES_PRODUCT.PRODUCT_NOT_FOUND;
  payload: boolean;
}

export interface SEARCH_PRODUCTS {
  type: TYPES_PRODUCT.SEARCH_PRODUCTS;
  payload: Product[];
}

export interface DELETE_PRODUCT_DETAIL {
  type: TYPES_DETAIL.DELETE_PRODUCT_DETAIL;
  payload: Product;
}
//======================
//Admin Actions
export interface DELETE_PRODUCT {
  type: TYPES_ADMIN.DELETE_PRODUCTS;
  payload: number;
}

export interface AXIOSDATA {
  successMsg: string;
  data: Product[];
}

export type Actions = PRODUCT_DETAIL | DELETE_PRODUCT_DETAIL;

export type UserActions = CREATE_USER | GET_USER | LOGOUT_USER | FIND_USER;

export type ProductActions = GET_PRODUCTS | ORDER_PRODUCTS | CHARGE_FILTERS | REMOVE_FILTER | FILTERED_CAT_PRODUCTS | FILTERED_BRAND_PRODUCTS | RESET_FILTERED_PRODUCTS | SEARCH_PRODUCTS | RESET_PRODUCTS | PRODUCT_NOT_FOUND | FILTER_BY_BRAND;

export type CategoriesActions = GET_CATEGORIES | GET_SUBCATEGORIES;

export type BrandsActions = GET_BRANDS;

export type AdminActions = DELETE_PRODUCT;

export type SetPage = SET_PAGE;
