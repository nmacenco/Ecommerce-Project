export enum TYPES {
  CREATE_USER,
  PRODUCT_DETAIL = "PRODUCT_DETAIL",
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

export type Actions = CREATE_USER | PRODUCT_DETAIL;
