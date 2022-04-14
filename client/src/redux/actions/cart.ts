import { Product, TYPES_CART } from "../interface";

export function addProductCart(product: Product) {
  console.log(product);
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
