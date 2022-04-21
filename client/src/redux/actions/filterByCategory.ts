
import { Product, TYPES_PRODUCT } from "../interface";



export const filterProducts = (value: string) => {
  try {
    return ({
      type: TYPES_PRODUCT.FILTERED_PRODUCTS,
      payload: value
    });
  } catch (error) {
    alert(error);
  }
};

export const filterByBrand = (value: string) => {
  try {
    return ({
      type: TYPES_PRODUCT.FILTER_BY_BRAND,
      payload: value
    });
  } catch (error) {
    alert(error);
  }
};

export const resetFilterProducts = () => {
  try {
    return ({
      type: TYPES_PRODUCT.RESET_FILTERED_PRODUCTS,
      payload: []
    });
  } catch (error) {
    alert(error);
  }
};

export const searchProducts = (productName: string) => {

  return {
    type: TYPES_PRODUCT.SEARCH_PRODUCTS,
    payload: productName
  }

}