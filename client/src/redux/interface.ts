export enum TYPES_USER{
    CREATE_USER,
    GET_USER,
    LOGOUT_USER,
    FIND_USER,

}

export enum TYPES {
    PRODUCT_DETAIL
    PRODUCT_DETAIL = 'PRODUCT_DETAIL',
    DELETE_PRODUCT_DETAIL = 'DELETE_PRODUCT_DETAIL',
}

export enum TYPES_PRODUCT{
    GET_PRODUCTS
}

export interface User {
    name: string,
    lastName: string,
    password: string,
    email: string,
    token:string
}


export interface Product {
    id: number,
    subcategory_id: string[],
    name: string,
    brand: string,
    image: string,
    price: number,
    description: string,
    weight: number,
    stock: number
}

/**
 * USER: 
 */

export interface CREATE_USER {
    type: TYPES_USER.CREATE_USER,
    payload: User
}
export interface GET_USER{
    type:TYPES_USER.GET_USER,
    payload:User
}
export interface LOGOUT_USER{
    type:TYPES_USER.LOGOUT_USER,
    payload:null
}
export interface FIND_USER{
    type:TYPES_USER.FIND_USER,
    payload:User
}

//=====================
//Products Actions
export interface PRODUCT_DETAIL {
    type: TYPES.PRODUCT_DETAIL,
    payload: Product
}
<<<<<<< HEAD
export interface GET_PRODUCTS{
    type:TYPES_PRODUCT.GET_PRODUCTS,
    payload:Product[]
}

=======
export interface DELETE_PRODUCT_DETAIL {
    type: TYPES.DELETE_PRODUCT_DETAIL,
    payload: Product
}
>>>>>>> 1f2c9174583a5ec6e8ad4bd109c52a40fe454512

//========================

export type Actions =
    | PRODUCT_DETAIL
  | DELETE_PRODUCT_DETAIL


export type UserActions=
| CREATE_USER
| GET_USER
| LOGOUT_USER
| FIND_USER
<<<<<<< HEAD


export type ProductActions=
| GET_PRODUCTS

=======
    
>>>>>>> 1f2c9174583a5ec6e8ad4bd109c52a40fe454512
