export enum TYPES {
<<<<<<< HEAD
  CREATE_USER,
  PRODUCT_DETAIL = "PRODUCT_DETAIL",
=======
    CREATE_USER,
    PRODUCT_DETAIL = 'PRODUCT_DETAIL',
    DELETE_PRODUCT_DETAIL = 'DELETE_PRODUCT_DETAIL',
>>>>>>> adeb277297a4f01e49b75268e575704325308ae1
}

export interface User {
  name: string;
  lastName: string;
  password: string;
  email: string;
}

export interface Product {
  id: number;
  subcategory_id: string[];
  name: string;
  brand: string;
  image: string;
  price: number;
  description: string;
  weight: number;
  stock: number;
}

/**
 * TYPES:
 *
 *
 */

export interface CREATE_USER {
  type: TYPES.CREATE_USER;
  payload: User;
}
export interface PRODUCT_DETAIL {
  type: TYPES.PRODUCT_DETAIL;
  payload: Product;
}
export interface DELETE_PRODUCT_DETAIL {
    type: TYPES.DELETE_PRODUCT_DETAIL,
    payload: Product
}

<<<<<<< HEAD
export type Actions = CREATE_USER | PRODUCT_DETAIL;
=======

export type Actions =
    | CREATE_USER
    | PRODUCT_DETAIL
    | DELETE_PRODUCT_DETAIL
>>>>>>> adeb277297a4f01e49b75268e575704325308ae1
