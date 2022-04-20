import axios from "axios";
import { Dispatch } from "redux";
import { ProductForm, TYPES_ADMIN } from '../interface';

const URL = "/api/admin/products/";

export const postProduct = (product: ProductForm, theToken: string) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.post(URL, product, {
        headers: {
          "auth-token":
            theToken,
        },
      });
    };
  } catch (error) {
    alert(error);
  }
};

export const deleteProduct = (id: string | undefined, data: any, theToken: string) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.put(`${URL}del/${id}`, data, {
        headers: {
          "auth-token":
            theToken,
        },
      });
      return dispatch({
        type: TYPES_ADMIN.DELETE_PRODUCTS,
        payload: id,
      });
    };
  } catch (error) {
    alert(error);
  }
};

export const putProducts = (editProduct: ProductForm, id: string | undefined, theToken: string) => {
  try {
    return async (dispatch: Dispatch) => {
      await axios.put(`${URL}${id}`, editProduct, {
        headers: {
          "auth-token":
            theToken,
        },
      });
    };
  } catch (error) {
    alert(error);
  }
};