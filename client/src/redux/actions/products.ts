import axios from "axios";
import { Dispatch } from "redux";

import { AXIOSDATA, Product, TYPES_PRODUCT } from "../interface";
// import interfaces from '....'
const URL = "http://localhost:3001/api";

const URL_WISH = "http://localhost:3001/api/wishList";

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
    payload: products,
  };
};
export const resetPoducts = () => {
  return {
    type: TYPES_PRODUCT.RESET_PRODUCTS,
    payload: [],
  };
};
export const productNotFound = (data: boolean) => {
  return {
    type: TYPES_PRODUCT.PRODUCT_NOT_FOUND,
    payload: data,
  };
};

/**
 * the get request for wishs
 * @param token User token "kmfoecmerhe..."
 */
export const getWish = (token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(URL_WISH, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      // console.log(response);

      const data = await response.json();

      // console.log(data);

      if (data.errorMsg) {
        console.log("error data: ", data.errorMsg);
      } else {
        dispatch({
          type: TYPES_PRODUCT.GET_WISHES,
          payload: data.data,
        });
      }
      // console.log("DATA: ", data);
    } catch (error) {
      console.log("ERROR EN GET WISHES: ", error);
    }
  };
};

/**
 *
 * @param id User id: productId
 * @param token User token : "fgjoytnsis..."
 */
export const deleteWish = (id: number, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(URL_WISH + `/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      });
      const data = await response.json();

      if (data.errorMsg) {
        console.log("error data: ", data.errorMsg);
      } else {
        dispatch({
          type: TYPES_PRODUCT.DELETE_WISHE,
          payload: id,
        });
      }
    } catch (error) {
      console.log("ERROR EN POST WISHS: ", error);
    }
  };
};
