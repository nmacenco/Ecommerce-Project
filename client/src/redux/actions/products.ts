import axios from "axios";
import { Dispatch } from "redux";

import { AXIOSDATA, Product, TYPES_PRODUCT } from "../interface";
// import interfaces from '....'
const URL = "http://localhost:3001/api";

export const getProducts = () => {
  try {
    return async (dispatch: Dispatch) => {
      const allProducts = await axios.get<AXIOSDATA>(`${URL}/products`);
      // console.log(allProducts.data.data);
      
      return dispatch({
        type: TYPES_PRODUCT.GET_PRODUCTS,
        payload: allProducts.data.data,
      });
    };
  } catch (error) {
    alert(error);
  }
};

export const orderProducts = (value: string, products: Product[]) => {
  try {
    return async (dispatch: Dispatch) => {
      return dispatch({
        type: TYPES_PRODUCT.ORDER_PRODUCTS,
        payload: {
          value,
          products,
        },
      });
    };
  } catch (error) {
    alert(error);
  }
};

export const selectProducts = (products: Product[]) => {
  // console.log("SELECT PRODUCTS DISPATCH");
  return {
    type: TYPES_PRODUCT.SEARCH_PRODUCTS,
    payload: products
  };
};
export const resetPoducts = () => {
  return {
    type: TYPES_PRODUCT.RESET_PRODUCTS,
    payload: []
  };
};
export const productNotFound = (data : boolean) => {
  return {
    type: TYPES_PRODUCT.PRODUCT_NOT_FOUND,
    payload: data
  };
};



