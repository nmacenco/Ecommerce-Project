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
export interface PRODUCT_DETAIL {
    type: TYPES.PRODUCT_DETAIL,
    payload: Product
}
export interface DELETE_PRODUCT_DETAIL {
    type: TYPES.DELETE_PRODUCT_DETAIL,
    payload: Product
}


export type Actions =
    | PRODUCT_DETAIL
  | DELETE_PRODUCT_DETAIL


export type UserActions=
| CREATE_USER
| GET_USER
| LOGOUT_USER
| FIND_USER
    
