import axios from "axios";
import { Dispatch } from "redux";
import { Product, TYPES_CART } from "../interface";

const URL_ORDERS = "http://localhost:3001/auth/orders"

export function addProductCart(product: Product) {
  return {
    type: TYPES_CART.ADD_PRODUCT,
    payload: product,
  };
}

export function removeProductCart(product: Product) {
  return {
    type: TYPES_CART.REMOVE_PRODUCT,
    payload: product,
  };
}
