import axios from "axios";
import { Dispatch } from "redux";

import { AXIOSDATA, Product, TYPES_PRODUCT } from "../interface";
// import interfaces from '....'
const URL = "http://localhost:3001/api";

export const getProducts = () => {
  try {
    return async (dispatch: Dispatch) => {
      const allProducts = await axios.get<AXIOSDATA>(`${URL}/products`);
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
          products
        }
      });
    };
  } catch (error) {
    alert(error);
  }
};

