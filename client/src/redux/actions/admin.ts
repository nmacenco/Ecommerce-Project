import axios from "axios";
import { Dispatch } from "redux";
import { Product, ProductForm, TYPES_ADMIN } from '../interface';

const URL = "http://localhost:3001/api/admin/products/";

export const postProduct = (product: ProductForm) => {
    try {
      return async (dispatch: Dispatch) => {
        await axios.post(URL, product);
      };
    } catch (error) {
      alert(error);
    }
  };

export const deleteProduct = (id: string | undefined , theToken : any ) => {
    try {
      return async (dispatch: Dispatch) => {    
        await axios.delete(URL + id , {
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
  
  export const putProducts = (editProduct: ProductForm, id: string | undefined) => {
    try {
      return async (dispatch: Dispatch) => {
        await axios.put(`${URL}${id}`, editProduct);
      };
    } catch (error) {
      alert(error);
    }
  };