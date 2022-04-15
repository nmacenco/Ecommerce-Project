import axios from "axios";
import { Dispatch } from "redux";
import { Product, TYPES_CART } from "../interface";

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

export const clearCart = () => {
  return {
    type: TYPES_CART.CLEAR_CART,
    payload: null,
  };
};


const URL_ORDER = "http://localhost:3001/api/auth/orders";

export const getPendingOrder = (token: string) => {
  try {   
    return async (dispatch: Dispatch) => {
      const activeOrder = await axios.get(URL_ORDER,{
        headers: {
          "auth-token": token,
        },
      });
      return dispatch({
        type: TYPES_CART.GET_ACTIVEORDER,
        payload: activeOrder.data.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const addProductOrder = (token: string, Productid: number) => {
  try {   
    return async (dispatch: Dispatch) => {
      await axios.put(`${URL_ORDER}/add`,{Productid},{
        headers: {
          "auth-token": token,
        },
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const removeProductOrder = (token: string, Productid: number) => {
  try {   
    return async (dispatch: Dispatch) => {
      await axios.put(`${URL_ORDER}/delete`,{Productid},{
        headers: {
          "auth-token": token,
        },
      });
    };
  } catch (error) {
    console.log(error);
  }
};
