export enum TYPES_USER {
    CREATE_USER,
    GET_USER,
    LOGOUT_USER,
    FIND_USER,
}

export enum TYPES_DETAIL {
    PRODUCT_DETAIL = 'PRODUCT_DETAIL',
    DELETE_PRODUCT_DETAIL = 'DELETE_PRODUCT_DETAIL',
}

export enum TYPES_PRODUCT {
    GET_PRODUCTS = 'GET_PRODUCTS'
}
export enum TYPES_CATEGORIES {
    GET_CATEGORIES = 'GET_CATEGORIES' ,
    GET_SUBCATEGORIES = 'GET_SUBCATEGORIES' ,
}

export interface User {
    name: string,
    lastName: string,
    password: string,
    email: string,
    token: string
}

export interface Product {
    id?: number,
    subcategory_id: string[],
    name: string,
    brand: string,
    image: string,
    price: number,
    description: string,
    weigth: number,
    stock: number
}
export interface Categories {
    id?: number,
    name: string,
}
export interface Subcategories {
    id?: number,
    name: string,
    CategoryId :number
}

export interface AXIOSDATA {
    successMsg: string,
    data: Product[]
}

/**
 * USER: 
 */

export interface CREATE_USER {
    type: TYPES_USER.CREATE_USER,
    payload: User
}
export interface GET_USER {
    type: TYPES_USER.GET_USER,
    payload: User
}
export interface LOGOUT_USER {
    type: TYPES_USER.LOGOUT_USER,
    payload: null
}
export interface FIND_USER {
    type: TYPES_USER.FIND_USER,
    payload: User
}
//=======================
// Categorie Actions 

export interface GET_CATEGORIES {
    type: TYPES_CATEGORIES.GET_CATEGORIES,
    payload: Categories[]
}
export interface GET_SUBCATEGORIES {
    type: TYPES_CATEGORIES.GET_SUBCATEGORIES,
    payload: Subcategories[]
}

//=====================
//Products Actions
export interface PRODUCT_DETAIL {
  type: TYPES_DETAIL.PRODUCT_DETAIL;
  payload: Product;
}
export interface GET_PRODUCTS {
    type: TYPES_PRODUCT.GET_PRODUCTS,
    payload: Product[]
}

export interface DELETE_PRODUCT_DETAIL {
    type: TYPES_DETAIL.DELETE_PRODUCT_DETAIL,
    payload: Product
}


export type Actions =
    | PRODUCT_DETAIL
    | DELETE_PRODUCT_DETAIL


export type UserActions =
    | CREATE_USER
    | GET_USER
    | LOGOUT_USER
    | FIND_USER

export type ProductActions =
    | GET_PRODUCTS

export type CategoriesActions =
    | GET_CATEGORIES
    | GET_SUBCATEGORIES

