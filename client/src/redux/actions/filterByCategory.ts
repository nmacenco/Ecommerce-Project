
import {  Product, TYPES_PRODUCT } from "../interface";


export const filterProducts = (value: string, products: Product[]) => {
    try {
        return ({
          type: TYPES_PRODUCT.FILTERED_PRODUCTS,
          payload: {
            value,
            products
          }
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

export const searchProducts=(productName:string)=>{

  return {
    type:TYPES_PRODUCT.SEARCH_PRODUCTS,
    payload:productName
  }

}