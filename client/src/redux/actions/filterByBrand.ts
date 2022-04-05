

import {  Product, TYPES_PRODUCT } from "../interface";


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