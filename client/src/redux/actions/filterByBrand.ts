

import { Product, TYPES_PRODUCT } from "../interface";


export const filterByBrand = (event: string) => {
  try {
    return ({
      type: TYPES_PRODUCT.FILTERED_BRAND_PRODUCTS,
      payload: event
    });
  } catch (error) {
    alert(error);
  }
};